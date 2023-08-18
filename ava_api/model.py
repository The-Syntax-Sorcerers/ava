import os
import numpy as np
import tensorflow as tf
from tqdm import tqdm

class SiameseNet(tf.keras.Model):
    def __init__(self, embedding_dim=323, output_shape=64):
        '''Initialize an untrained SiameseNet model'''
        super().__init__()
        self.base = self.create_base_network(embedding_dim)
        self.clf = self.create_clf_network(output_shape*2)

    def call(self, inputs):
        anchor = inputs[0]
        positive = inputs[1]
        negative = inputs[2]

        output_anchor = self.base(anchor)
        output_positive = self.base(positive)
        output_negative = self.base(negative)

        # Anchor - Positive
        x1 = tf.concat([output_anchor, output_positive], axis=-1)
        x1_out = self.clf(x1)

        # Anchor - Negative
        x2 = tf.concat([output_anchor, output_negative], axis=-1)
        x2_out = self.clf(x2)

        return (x1_out, x2_out)
    
    def create_dense_block(self, x, units, dropout_rate, l1_reg, l2_reg):
        x = tf.keras.layers.Dense(units, kernel_regularizer=tf.keras.regularizers.l1_l2(l1=l1_reg, l2=l2_reg))(x)
        x = tf.keras.layers.BatchNormalization()(x)
        x = tf.keras.layers.Activation('relu')(x)
        return tf.keras.layers.Dropout(dropout_rate)(x)

    # Define the base network
    def create_base_network(self, embedding_dim, dropout_rate=0.4, l1_reg=0.001, l2_reg=0.001):
        input = tf.keras.layers.Input(shape=embedding_dim)
        x = tf.keras.layers.BatchNormalization()(input)

        x = self.create_dense_block(x, 256, dropout_rate, l1_reg, l2_reg)
        x = self.create_dense_block(x, 128, dropout_rate, l1_reg, l2_reg)
        x = self.create_dense_block(x, 64, dropout_rate, l1_reg, l2_reg)

        x = tf.keras.layers.Dense(64, activation='linear')(x)

        return tf.keras.Model(inputs=input, outputs=x)

    def create_clf_network(self, input_shape, dropout_rate=0.5, l1_reg=0.003, l2_reg=0.003):
        input = tf.keras.layers.Input(shape=(input_shape,))
        x = tf.keras.layers.BatchNormalization()(input)

        x = self.create_dense_block(x, 128, dropout_rate, l1_reg, l2_reg)
        x = self.create_dense_block(x, 64, dropout_rate, l1_reg, l2_reg)
        x = self.create_dense_block(x, 32, dropout_rate, l1_reg, l2_reg)

        x = tf.keras.layers.Dense(1, activation='sigmoid')(x)

        return tf.keras.Model(inputs=input, outputs=x)

    def generate_concatenated_vectors(self, data):
        concatenated_vectors = []

        for k, v in tqdm(data.items(), total=len(data)):
            # Process known vectors
            known_feature_vectors = self.base.predict(np.array(v['known']), verbose=0)

            # Process unknown vectors
            unknown_feature_vectors = self.base.predict(np.array(v['unknown']), verbose=0)

            # Compute the average feature vector
            author_representation = np.mean(known_feature_vectors, axis=0)
            unknown_representation = np.mean(unknown_feature_vectors, axis=0)

            concate_vec = np.concatenate((author_representation, unknown_representation), axis=None)

            concatenated_vectors.append(concate_vec)

        return np.array(concatenated_vectors)
    
    def get_predictions(self, data):
        input_vec = self.generate_concatenated_vectors(data)
        predictions = []
        y_predict = self.clf.predict(input_vec)
        for i in range(len(y_predict)):
            if y_predict[i] > 0.5:
                predictions.append(1)
            elif y_predict[i] < 0.5:
                predictions.append(-1)
            else:
                predictions.append(0)
        return predictions


    
def load_model(checkpoint_dir):
    ''' Load the SiameseNet model from saved checkpoints'''

    siamese_model = SiameseNet(323, 64)
    latest = tf.train.latest_checkpoint(os.path.abspath(checkpoint_dir))
    siamese_model.load_weights(latest)
    return siamese_model


