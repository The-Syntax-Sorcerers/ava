import os
import json
import sys
import json
import nltk
import string

import glob
import numpy as np
from tqdm import tqdm

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from gensim.models import Word2Vec

from flaskr.extensions import supabase_sec


nltk.download(["punkt", "stopwords", "wordnet"])

sys.path.insert(0, '..')  # Point to the parent directory of both ava_api and flask


supabase = supabase_sec
sys.path.pop(0)


# I hope this database model structure should be there
# users table
# user_email | user_name| concat_vec | (any other fields you want)
# concat_vec will be stored as JSON

# documents table
# user_email | doc_Id |file | ....(any other fields you want)
# note that for documents table, user_email and document Id both are primary composite key
# to ensure one student can have multiple documents stored


def extract_text_from_files(user_email, file_path):
    # Extract data from database for the given user_email
    query_results = supabase.table('documents').select('file').eq('user_email', user_email)

    # Extracting and processing document texts from results
    known_texts = []
    for res in query_results.data:
        text_content = res['file']
        cleaned_lines = [line.strip().lstrip("\ufeff") for line in text_content.split('\n')]
        known_texts.append(cleaned_lines)

    # Process the file for the unknown document
    unknown_text = []
    with open(file_path, 'r') as file:
        text_lines = []
        for line in file:
            cleaned_line = line.strip().lstrip("\ufeff")
            text_lines.append(cleaned_line)
    unknown_text.append(text_lines)

    # known_texts and unknown_text are list of list strings and each list of a string
    # refers to a single document
    return known_texts, unknown_text


def build_corpus(data_directory, user_email):
    corpus = {}
    # given that only one txt file is there so just index that file
    problem_file_paths = glob.glob(os.path.join(data_directory, '*'))[0]

    known_text, unknown_text = extract_text_from_files(user_email, problem_file_paths)
    corpus[0] = {
        'known': known_text,
        'unknown': unknown_text
    }

    return corpus


def preprocess_text(text):
    """
    Preprocess a given text by tokenizing, removing punctuation and numbers,
    removing stop words, and lemmatizing.

    Args:
        text (str): The text to preprocess.

    Returns:
        list: The preprocessed text as a list of tokens.
    """
    if not isinstance(text, str):
        text = str(text)

    # Tokenize the text into words
    tokens = word_tokenize(text.lower())

    # Remove punctuation and numbers
    table = str.maketrans('', '', string.punctuation + string.digits)
    tokens = [word.translate(table) for word in tokens]

    # Remove stop words
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if (not word in stop_words) and (word != '')]

    # Lemmatize words
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]

    return tokens


def convert_text_to_vector(texts, model, vector_size):
    """
    Convert a list of texts into their corresponding word2vec vectors
    """
    vectors = []
    for text in texts:
        words = preprocess_text(text)
        vector = np.sum([model.wv[word] for word in words if word in model.wv], axis=0)
        word_count = np.sum([word in model.wv for word in words])
        if word_count != 0:
            vector /= word_count
        else:
            vector = np.zeros(vector_size)
        vectors.append(vector)
    return vectors


def count_punctuations(texts):
    """
  Count the frequency of different punctuations in the texts
  """
    # Define punctuations to count
    punctuations = {'.', ',', ';', ':', '!', '?', '-', '(', ')', '\"', '\'', '`', '/'}

    # Initialize dictionary to count punctuations
    punctuations_count = {p: 0 for p in punctuations}

    # Count punctuations in text_list
    for text in texts:
        for char in text:
            if char in punctuations:
                punctuations_count[char] += 1

    # Return list of punctuation counts
    return list(punctuations_count.values())


def analyze_sentence_lengths(sentences):
    """
  Analyze the lengths of sentences
  """
    sentence_lengths = [len(sentence.split()) for sentence in sentences]
    average_length = np.mean(sentence_lengths)
    count_over_avg = np.sum([length > average_length for length in sentence_lengths])
    count_under_avg = np.sum([length < average_length for length in sentence_lengths])
    count_avg = len(sentence_lengths) - count_over_avg - count_under_avg

    return [count_over_avg, count_under_avg, count_avg, average_length]


def analyze_words(texts):
    """
    Analyze the words used in the texts
    """
    words = []
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    for text in texts:
        tokenized = word_tokenize(text.lower())
        processed = [lemmatizer.lemmatize(word) for word in tokenized if word not in stop_words]
        words += processed
    word_freq = nltk.FreqDist(words)
    rare_count = np.sum([freq <= 2 for word, freq in word_freq.items()])
    long_count = np.sum([len(word) > 6 for word in words])
    word_lengths = [len(word) for word in words]
    average_length = np.mean(word_lengths)
    count_over_avg = np.sum([length > average_length for length in word_lengths])
    count_under_avg = np.sum([length < average_length for length in word_lengths])
    count_avg = len(word_lengths) - count_over_avg - count_under_avg
    ttr = len(set(words)) / len(words) if words else 0

    return [rare_count, long_count, count_over_avg, count_under_avg, count_avg, ttr]


def calculate_style_vector(texts):
    """
  Calculate the style vector of the texts
  """
    punctuation_vec = count_punctuations(texts)  # Punctuations stylistic features
    sentence_vec = analyze_sentence_lengths(texts)  # Sentences stylistic features
    word_vec = analyze_words(texts)  # Words stylistic features
    word_count = np.sum([len(text.split()) for text in texts])

    vector = np.concatenate((punctuation_vec, sentence_vec, word_vec))

    return vector / word_count if word_count else vector


def get_vectors(texts, w2v_model, vector_size):
    res = []
    for text in texts:
        w2v_vec = np.mean(convert_text_to_vector(text, w2v_model, vector_size), axis=0)
        style_vec = calculate_style_vector(text)
        res.append(np.concatenate((w2v_vec, style_vec), axis=None))

    return res


def vectorize_text_data(data, w2v_model, vector_size, user_email):
    """
  Build author data from the corpus
  """
    res = {}
    for key, val in tqdm(data.items(), total=len(data)):
        if len(val['unknown']) == 0:
            continue

        # fetch already present concatenated vec from database
        vector_result = supabase.table('users').select('concat_vec').eq('user_email', user_email)
        if not vector_result.data or vector_result.data[0]['concat_vec'] is None:

            concat_vec = get_vectors(val['known'], w2v_model, vector_size)
            # Store the computed concat_vec into the database for the user
            json_string = json.dumps(concat_vec)
            update_response = supabase.table('users').update({
                'concat_vec': json_string
            }).eq('user_email', user_email)
            # error handling
            if update_response.error:
                print("Error updating concat_vec for user:", update_response.error)

            res[key] = {
                # need to modify this i.e., if concatenated vec present already then no need to calculate again
                'known': concat_vec,
                'unknown': get_vectors(val['unknown'], w2v_model, vector_size),
            }
        else:
            res[key] = {
                'known': json.loads(vector_result.data[0]['concat_vec']),
                'unknown': get_vectors(val['unknown'], w2v_model, vector_size),
            }

    return res


def preprocess_dataset(data_directory, vector_size=300, user_email=""):
    test_corpus = build_corpus(data_directory, user_email)
    word2vec_model = Word2Vec.load("w2v_model/word2vec.model")
    test_data = vectorize_text_data(test_corpus, word2vec_model, vector_size, user_email)
    return test_data
