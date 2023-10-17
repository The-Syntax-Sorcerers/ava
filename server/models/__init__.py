from flask_login import UserMixin
from supabase import Client
import datetime

from server.extensions import supabase_anon, supabase_sec

TEST_USER = {'name': 'Test Name',
             'email': 'nonrealuserfortesting@gmail.com',
             'password': 'secret_password',
             'confirmPassword': 'secret_password'}


class User(UserMixin):

    def __init__(self, tid, email, name):
        # This variable needs to be called
        # `id` to shadow variable of parent class `UserMixin`
        self.id = tid
        self.name = name
        self.email = email

    def __repr__(self):
        return f'<User> id: {self.id}, email: {self.email}'

    def get_subjects(self):
        try:
            res = supabase_sec.table('StudentSubject').select(
                'subject_id').eq('student_id', self.id).execute()
            res2 = supabase_sec.table('Subject').select(
                'id').eq('professor_email', self.email).execute()
            print(res.data)
            print(res.data)
            print(res.data + res2.data)
            subjects = []
            for student_dict in (res.data + res2.data):
                d = student_dict.get('subject_id', student_dict.get('id'))
                subjects.append(Subject.get_subject(d))
            return subjects
        except:
            pass

    def get_assignments(self):
        res = supabase_sec.table('StudentSubject').select('subject_id'
                                                          ).eq('student_id', self.id).execute()
        assigns = []
        for student_dict in res.data:
            assigns += Assignment.get_all_assignments(
                subject_id=student_dict['subject_id'])
        return assigns

    def get_user_type(self):
        res = supabase_sec.table('User').select(
            '*').eq('email', self.email).execute().data
        if res:
            res = res[0]
            return res['user_type']
        return None

    @staticmethod
    def get_user(user_id):
        res = supabase_sec.table('User').select(
            '*').eq('id', user_id).execute().data
        if res:
            res = res[0]
            return User(res['id'], res['email'], res['name'])
        return None

    @staticmethod
    def get_user_with_email(user_email):
        res = supabase_sec.table('User').select(
            '*').eq('email', user_email).execute().data
        if res:
            res = res[0]
            return User(res['id'], res['email'], res['name'])
        return None

    # Deletes a user from the database
    def delete_user(user_id, user_email, user_name, requesting_user):
        # Check if the requesting user is allowed to perform this action
        if requesting_user.is_admin or requesting_user.id == user_id:
            try:
                res = supabase_sec.table('User').select(
                    '*').eq('id', id).execute().data
                if (res['email'] == user_email) and (res['name'] == user_name):
                    # Send a DELETE request to the Supabase table to delete the user by ID
                    res = supabase_sec.table('User').delete().eq(
                        'id', user_id).execute()

                if res.status_code == 200:
                    return True
                else:
                    return False
            except Exception as e:
                # Handle any exceptions or errors that may occur during the deletion
                print(f"Error deleting user: {str(e)}")
                return False
        # The requesting user is not allowed to delete the requested account
        else:
            return False

    def get_vectors(self):

        punc_vecs = {
            'Periods': [],
            'Commas': [],
            'Semicolons': [],
            'Colons': [],
            'Exclamations': [],
            'Question Marks': [],
            'Dashes': [],
            'Open Parentheses': [],
            'Close Parentheses': [],
            'Double Quotes': [],
            'Apostrophe': [],
            'Tilda': [],
            'Forward Slash': [],
        }

        sentence_vecs = {
            'Count of Sentences Over Average': [],
            'Count of Sentences Under Average': [],
            'Count of Average Sentences': [],
            'Average Sentence Length': []
        }

        word_vecs = {
            'Rare Word Count': [],
            'Long Word Count': [],
            'Count Over Average': [],
            'Count Under Average': [],
            'Count Average': [],
            'Average Word Length': [],
            'Token Type Ratio': []
        }
        word_counts = []
        assignmentLabels = []
        all_scores = []

        # Query Supabase table
        response = supabase_sec.table('SubjectAssignmentUser').select(
            '*').eq('user_id', self.id).execute()
        for res in response.data:
            assignmentLabels.append(
                str(res['subject_id']) + "-" + str(res['assignment_id']))
            punc_vecs['Periods'].append(res['punc_periods'])
            punc_vecs['Commas'].append(res['punc_commas'])
            punc_vecs['Semicolons'].append(res['punc_semicolons'])
            punc_vecs['Colons'].append(res['punc_colons'])
            punc_vecs['Exclamations'].append(res['punc_exclamations'])
            punc_vecs['Question Marks'].append(res['punc_questions'])
            punc_vecs['Dashes'].append(res['punc_dashes'])
            punc_vecs['Open Parentheses'].append(res['punc_open_par'])
            punc_vecs['Close Parentheses'].append(res['punc_close_par'])
            punc_vecs['Double Quotes'].append(res['punc_double_quotes'])
            punc_vecs['Apostrophe'].append(res['punc_apostrophes'])
            punc_vecs['Tilda'].append(res['punc_tilda'])
            punc_vecs['Forward Slash'].append(res['punc_forward_slash'])
            sentence_vecs['Count of Sentences Over Average'].append(
                round(res['sent_over_avg'], 1))
            sentence_vecs['Count of Sentences Under Average'].append(round(
                res['sent_under_avg'], 1))
            sentence_vecs['Count of Average Sentences'].append(round(
                res['sent_count_avg'], 1))
            sentence_vecs['Average Sentence Length'].append(round(
                res['sent_avg_length'], 1))
            word_vecs['Rare Word Count'].append(
                round(res['word_rare_count'], 1))
            word_vecs['Long Word Count'].append(
                round(res['word_long_count'], 1))
            word_vecs['Count Over Average'].append(
                round(res['word_over_avg'], 1))
            word_vecs['Count Under Average'].append(
                round(res['word_under_avg'], 1))
            word_vecs['Count Average'].append(round(res['word_count_avg'], 1))
            word_vecs['Average Word Length'].append(
                round(res['word_avg_length'], 1))
            word_vecs['Token Type Ratio'].append(round(res['word_ttr'], 1))
            word_counts.append(res['word_count'])
            all_scores.append(res['similarity_score'])

        successful = [x for x in all_scores if x > 0.5]
        failures = len(all_scores) - len(successful)
        avg_score = sum(all_scores) / len(all_scores)

        return punc_vecs, sentence_vecs, word_vecs, word_counts, assignmentLabels, \
            all_scores, failures, len(successful), avg_score

    @staticmethod
    # Deletes user created during testing
    def delete_test_user():
        supabase_sec.table('User').delete().eq(
            'email', TEST_USER['email']).execute()

    @staticmethod
    # gets test user credentials
    def get_test_user(loginData=False):
        if supabase_sec.table('User').select('*').eq('email', TEST_USER['email']).execute():
            User.delete_test_user()
        if loginData:
            return {TEST_USER['email'], TEST_USER['password']}
        return TEST_USER.copy()

    @staticmethod
    def supabase_signup_wrapper(email, password, name):
        print("Attempted signup", email, password)
        user = supabase_anon.auth.sign_up(
            {"email": email, "password": password})

        dto = {
            "email": email,
            "name": name,
            "uuid": user.user.id
        }

        supabase_sec.table('User').insert(dto).execute()
        print("Signed up:", email)


class Subject:
    def __init__(self, subject_id, description, professor_email, subject_name):
        self.subject_id = subject_id
        self.description = description
        self.professor_email = professor_email
        self.name = subject_name

    def __repr__(self):
        return (f'<Subject> subject_id: {self.subject_id}, '
                + f'sub_name: {self.name}, '
                + f'prof_email: {self.professor_email}')

    def get_students(self):
        res = supabase_sec.table('StudentSubject').select(
            'student_id').eq('subject_id', self.subject_id).execute()
        students = []
        for student_dict in res.data:
            students.append(User.get_user(student_dict.get('student_id')))
        return students

    def get_assignments(self):
        res = supabase_sec.table('Assignment').select(
            '*').eq('subject_id', self.subject_id).execute()
        assigns = []
        for r in res.data:
            assigns.append(Assignment(
                r['id'], r['subject_id'], r['name'], r['description'], r['due_datetime']))
        return assigns

    # Returns a specific subject using a given subject_id
    @staticmethod
    def get_subject(subject_id):
        res = supabase_sec.table('Subject').select(
            '*').eq('id', subject_id).execute().data
        if res:
            res = res[0]
            return Subject(res['id'], res['description'], res['professor_email'], res['name'])
        return None

    # Returns every subject
    @staticmethod
    def get_all_subjects():
        res = supabase_sec.table('Subject').select('*').execute()
        subs = []
        for r in res.data:
            subs.append(Subject(r['id'], res['description'],
                        r['professor_email'], r['name']))
        return subs

    @staticmethod
    def create_subject(temp_sub):
        try:
            supabase_sec.table('Subject').insert(
                temp_sub.get_payload_format()).execute()
        except:
            pass

    def get_payload_format(self):
        data = {
            'id': self.subject_id,
            'name': self.name,
            'description': self.description,
            'professor_email': self.professor_email
        }
        return data


class Assignment:

    def __init__(self, assignment_id, subject_id,
                 assignment_name, description, submission_locked, due_datetime=None):
        self.id = assignment_id
        self.subject_id = subject_id
        self.name = assignment_name
        self.description = description
        self.due_datetime = due_datetime
        self.submission_locked = submission_locked
        if due_datetime:
            # Separates datetime into date and time
            self.due_datetime = datetime.datetime.strptime(
                due_datetime, "%Y-%m-%dT%H:%M:%S%z")
            self.due_date = self.due_datetime.date()
            self.due_time = self.due_datetime.time()
        else:
            self.due_date = self.due_time = None

    def __repr__(self):
        return (f'<Assignment> name: {self.name}, '
                + f'assignment_id: {self.id}, '
                + f'subject_id: {self.subject_id}, '
                + f'due_datetime: {self.due_datetime}, '
                + f'due_date: {self.due_date}, '
                + f'due_time: {self.due_time}, '
                + f'submission_locked: {self.submission_locked}')

    # Returns a specific assignment using a given subject_id and assignment_id
    @staticmethod
    def get_assignment(subject_id, assignment_id):
        res = supabase_sec.table('Assignment').select(
            '*').eq('id', assignment_id).eq('subject_id', subject_id).execute().data
        if res:
            res = res[0]
            return Assignment(res['id'], res['subject_id'], res['name'], res['description'], res['submission_locked'], res['due_datetime'])
        return None

    # Returns all assignments using a given subject_id
    @staticmethod
    def get_all_assignments(subject_id=None):
        if subject_id:
            res = supabase_sec.table('Assignment').select(
                '*').eq('subject_id', subject_id).execute().data
        else:
            res = supabase_sec.table('Assignment').select('*').execute().data
        if res:
            return [Assignment(r['id'], r['subject_id'], r['name'], r['description'], r['submission_locked'], r['due_datetime']) for r in res]
        return []

    @staticmethod
    def create_assignment(data):
        try:
            supabase_sec.table('Assignment').insert([data]).execute()
        except:
            pass

    # will return a dict representation
    def to_dict(self):
        return {"due_date": self.due_date, "id": self.id, "name": self.name}


class Storage:

    def __init__(self, sec=supabase_sec):
        self.initialised = True
        self.supabase_sec = sec
        self.ass_bucket = 'ava-prod-assignments'
        self.past_ass_bucket = 'ava-prod-past-assignments'

    @staticmethod
    def construct_path(subject_id, assignment_id, user_id):
        return f'{subject_id}/{assignment_id}/{user_id}'

    def upload_assignment(self, file, subject_id, assignment_id, user_id):
        path = self.construct_path(subject_id, assignment_id, user_id)
        if not self.exists_assignment_bool(subject_id, assignment_id, user_id):
            return self.supabase_sec.storage.from_(self.ass_bucket).upload(
                path, file)
        return None

    def download_assignment(self, subject_id, assignment_id, user_id):
        # Will return a byte stream.
        path = self.construct_path(subject_id, assignment_id, user_id)
        return self.supabase_sec.storage.from_(self.ass_bucket).download(path)

    def delete_assignment(self, subject_id, assignment_id, user_id):
        path = self.construct_path(subject_id, assignment_id, user_id)
        return self.supabase_sec.storage.from_(self.ass_bucket).remove(path)

    def exists_assignment(self, subject_id, assignment_id, user_id):
        # if the folder is empty, db returns 1 element in list[0]
        # as a placeholder
        res = self.supabase_sec.storage.from_(self.ass_bucket).list(
            f'{subject_id}/{assignment_id}')
        for obj in res:
            if obj['name'] == user_id:
                return [obj]
        return []

    def exists_assignment_bool(self, subject_id, assignment_id, user_id):
        # if the folder is empty, db returns 1 element in list[0]
        # as a placeholder
        res = self.supabase_sec.storage.from_(
            self.ass_bucket).list(f'{subject_id}/{assignment_id}')
        for obj in res:
            if obj['name'] == user_id:
                return True
        return False

    def cron_get_all_uploaded_assignments(self, subject_id, assignment_id):
        # if the folder is empty, db returns 1 element in list[0]
        # as a placeholder
        final_dict = {}
        try:
            res = self.supabase_sec.storage.from_(
                self.ass_bucket).list(f'{subject_id}/{assignment_id}')
            for obj in res:
                temp_user_id = obj['name']
                final_dict[temp_user_id] = self.download_assignment(
                    subject_id, assignment_id, temp_user_id)
            self.__cron_delete_entire_assignments_folder(
                subject_id, assignment_id)
            self.supabase_sec.table('Assignment').update({'submission_locked': True}).eq(
                'subject_id', subject_id).eq('id', assignment_id).execute()
        except:
            pass

        return final_dict

    def __cron_delete_entire_assignments_folder(self, subject_id, assignment_id):
        try:
            path = f'{subject_id}/{assignment_id}'
            return self.supabase_sec.storage.from_(self.ass_bucket).remove(path)
        except:
            return None


class PastStorage:

    def __init__(self, sec=supabase_sec):
        self.initialised = True
        self.supabase_sec = sec
        self.ass_bucket = 'ava-prod-past-assignments'

    @staticmethod
    def construct_path(user_id, subject_id, assignment_id):
        return f'{user_id}/{subject_id}-{assignment_id}'

    def upload_assignment(self, file, user_id, subject_id, assignment_id):
        path = self.construct_path(user_id, subject_id, assignment_id)
        if not self.exists_assignment(user_id, subject_id, assignment_id):
            return self.supabase_sec.storage.from_(self.ass_bucket).upload(path, file)
        return None

    def download_assignment(self, user_id, subject_id, assignment_id):
        # Will return a byte stream.
        try:
            path = self.construct_path(user_id, subject_id, assignment_id)
            return self.supabase_sec.storage.from_(self.ass_bucket).download(path)
        except:
            return None

    def exists_assignment(self, user_id, subject_id, assignment_id):
        # if the folder is empty, db returns 1 element in list[0]
        # as a placeholder
        res = self.supabase_sec.storage.from_(
            self.ass_bucket).list(f'{user_id}')
        for obj in res:
            if obj['name'] == f'{subject_id}-{assignment_id}':
                return [obj]
        return []
