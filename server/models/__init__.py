from time import sleep

from flask_login import UserMixin
from storage3.utils import StorageException
import datetime

from server.extensions import supabase_anon, supabase_sec

TEST_USER = {'name': 'Test Name',
             'email': 'nonrealuserfortesting@gmail.com',
             'password': 'secret_password',
             'confirmPassword': 'secret_password'}
PAST_ASSIGNMENTS_BUCKET = 'ava-prod-past-assignments'
CURRENT_ASSIGNMENTS_BUCKET = 'ava-prod-assignments'


class User(UserMixin):

    def __init__(self, tid, email, name, user_type):
        # This variable needs to be called
        # `id` to shadow variable of parent class `UserMixin`
        self.id = tid
        self.name = name
        self.email = email
        self.user_type = user_type

    def __repr__(self):
        return f'<User> id: {self.id}, email: {self.email}'

    def get_subjects(self):
        try:
            if self.user_type == 'student':
                res = supabase_sec.table('StudentSubject').select('subject_id').eq('student_id', self.id).execute()
            else:
                res = supabase_sec.table('Subject').select('id').eq('professor_email', self.email).execute()

            subjects = []
            for student_dict in res.data:
                d = student_dict.get('subject_id', student_dict.get('id'))
                subjects.append(Subject.get_subject(d))
            return subjects
        except:
            pass

    def get_assignments(self):
        for i in range(5):
            res = supabase_sec.table('StudentSubject').select('subject_id').eq('student_id', self.id).execute()
            if res:
                assigns = []
                for student_dict in res.data:
                    assigns += Assignment.get_all_assignments(subject_id=student_dict['subject_id'])
                return assigns
            sleep(0.2)
        return None

    @staticmethod
    def get_user(user_id):
        res = supabase_sec.table('User').select(
            '*').eq('id', user_id).execute().data
        if res:
            res = res[0]
            return User(res['id'], res['email'], res['name'], res['user_type'])
        return None

    @staticmethod
    def get_user_with_email(user_email):
        for i in range(5):
            res = supabase_sec.table('User').select('*').eq('email', user_email).execute().data
            print("GET USER RESULT:", res)
            if res:
                res = res[0]
                return User(res['id'], res['email'], res['name'], res['user_type'])
            sleep(0.2)
        return None

    # Deletes a user from the database
    @staticmethod
    def delete_user(user_id, user_email, user_name, requesting_user):
        # Check if the requesting user is allowed to perform this action
        if requesting_user.is_admin or requesting_user.id == user_id:
            try:
                res = supabase_sec.table('User').select('*').eq('id', id).execute().data
                if (res['email'] == user_email) and (res['name'] == user_name):
                    # Send a DELETE request to the Supabase table to delete the user by ID
                    res = supabase_sec.table('User').delete().eq('id', user_id).execute()

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

    @staticmethod
    # Deletes user created during testing
    def delete_test_user():
        supabase_sec.table('User').delete().eq('email', TEST_USER['email']).execute()

    @staticmethod
    # gets test user credentials
    def get_test_user(login_data=False):
        if supabase_sec.table('User').select('*').eq('email', TEST_USER['email']).execute():
            User.delete_test_user()
        if login_data:
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
        res = supabase_sec.table('Assignment').select('*').eq('subject_id', self.subject_id).execute()
        assigns = []
        for r in res.data:
            assigns.append(Assignment(
                r['id'], r['subject_id'], r['name'], r['description'], r['submission_locked'], r['due_datetime']))
        return assigns

    # Returns a specific subject using a given subject_id
    @staticmethod
    def get_subject(subject_id):
        for i in range(5):
            res = supabase_sec.table('Subject').select('*').eq('id', subject_id).execute().data
            print(res)
            if res:
                res = res[0]
                return Subject(res['id'], res['description'], res['professor_email'], res['name'])
            sleep(0.2)
        return None

    # Returns every subject
    @staticmethod
    def get_all_subjects():
        res = supabase_sec.table('Subject').select('*').execute()
        subs = []
        for r in res.data:
            subs.append(Subject(r['id'], r['description'],
                        r['professor_email'], r['name']))
        return subs

    @staticmethod
    def create_subject(temp_sub):
        try:
            supabase_sec.table('Subject').insert(temp_sub.get_payload_format()).execute()
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
        if not res:
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
            res = supabase_sec.table('Assignment').select('*').eq('subject_id', subject_id).execute().data
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
    def list_past_assignments(user_email):
        # If there are files in directory, return a list of file names
        # Else, return an empty list

        objects = []
        username = user_email.split('@')[0]
        res = supabase_sec.storage.from_(PAST_ASSIGNMENTS_BUCKET).list(username)
        for obj in res:
            if obj['name'] != '.emptyFolderPlaceholder':
                objects.append(obj['name'])
        return objects

    @staticmethod
    def get_past_files(user_email):
        # Old method, likely not used
        # If there are files in directory, return a python list of files (byte streams)
        # Else, return an empty list

        past_assignments = []
        username = user_email.split('@')[0]
        res = supabase_sec.storage.from_(PAST_ASSIGNMENTS_BUCKET).list(username)
        for file_object in res:
            try:
                if file_object['name'] != '.emptyFolderPlaceholder':
                    path = Storage.construct_path_past(username, file_object['name'])
                    past_assignments.append(supabase_sec.storage.from_(PAST_ASSIGNMENTS_BUCKET).download(path))
            except StorageException:
                pass
        return past_assignments

    @staticmethod
    def construct_path_past(username, filename):
        return f'{username}/{filename}'

    @staticmethod
    def construct_path_current(subject_id, assignment_id, user_id):
        return f'{subject_id}/{assignment_id}/{user_id}'

    @staticmethod
    def upload_current_assignment(file, subject_id, assignment_id, user_id):
        path = Storage.construct_path_current(subject_id, assignment_id, user_id)
        if not Storage.exists_assignment_bool(subject_id, assignment_id, user_id):
            return supabase_sec.storage.from_(CURRENT_ASSIGNMENTS_BUCKET).upload(path, file)
        return None

    @staticmethod
    def download_current_assignment(subject_id, assignment_id, user_id):
        # Will return a byte stream.
        # Essentially, it returns file.read(): byteStream in python.
        try:
            path = Storage.construct_path_current(subject_id, assignment_id, user_id)
            return supabase_sec.storage.from_(CURRENT_ASSIGNMENTS_BUCKET).download(path)
        except StorageException:
            return None

    @staticmethod
    def delete_current_assignment(subject_id, assignment_id, user_id):
        path = Storage.construct_path_current(subject_id, assignment_id, user_id)
        try:
            supabase_sec.storage.from_(CURRENT_ASSIGNMENTS_BUCKET).remove(path)
        except:
            pass
        return

    @staticmethod
    def exists_assignment(subject_id, assignment_id, user_id):
        # if the folder is empty, db returns 1 element in list[0]
        # as a placeholder
        res = supabase_sec.storage.from_(CURRENT_ASSIGNMENTS_BUCKET).list(
            f'{subject_id}/{assignment_id}')
        for obj in res:
            if obj['name'] == user_id:
                return [obj]
        return []

    @staticmethod
    def exists_assignment_bool(subject_id, assignment_id, user_id):
        # if the folder is empty, db returns 1 element in list[0]
        # as a placeholder
        res = supabase_sec.storage.from_(
            CURRENT_ASSIGNMENTS_BUCKET).list(f'{subject_id}/{assignment_id}')
        for obj in res:
            if obj['name'] == user_id:
                return True
        return False

    def cron_get_all_uploaded_assignments(self, subject_id, assignment_id):
        # if the folder is empty, db returns 1 element in list[0]
        # as a placeholder
        final_dict = {}
        try:
            res = self.supabase_sec.storage.from_(self.ass_bucket).list(f'{subject_id}/{assignment_id}')
            for obj in res:
                temp_user_id = obj['name']
                final_dict[temp_user_id] = self.download_current_assignment(subject_id, assignment_id, temp_user_id)
            self.__cron_delete_entire_assignments_folder(subject_id, assignment_id)
            self.supabase_sec.table('Assignment').update({'submission_locked': True}).eq('subject_id', subject_id).eq('id', assignment_id).execute()
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
        res = self.supabase_sec.storage.from_(self.ass_bucket).list(f'{user_id}')
        for obj in res:
            if obj['name'] == f'{subject_id}-{assignment_id}':
                return [obj]
        return []
