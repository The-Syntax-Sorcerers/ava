from flask_login import UserMixin
from supabase import Client
import datetime

from flaskr.extensions import supabase_anon, supabase_sec

class User(UserMixin):

    def __init__(self, tid, email, name):
        self.id = tid  # This variable needs to be called `id` to shadow variable of parent class `UserMixin`
        self.name = name
        self.email = email

    def __repr__(self):
        return f'<User> id: {self.id}, email: {self.email}'

    def get_subjects(self):
        res = supabase_sec.table('StudentSubject').select('subject_id').eq('student_id', self.id).execute()
        subjects = []
        for student_dict in res.data:
            subjects.append(Subject.get_subject(student_dict.get('subject_id')))
        return subjects

    def get_assignments(self):
        res = supabase_sec.table('StudentSubject').select('subject_id').eq('student_id', self.id).execute()
        assigns = []
        for student_dict in res.data:
            assigns += Assignment.get_all_assignments(subject_id=student_dict['subject_id'])
        return assigns

    @staticmethod
    def get_user(user_id):
        res = supabase_sec.table('User').select('*').eq('id', user_id).execute().data
        if res:
            res = res[0]
            return User(res['id'], res['email'], res['name'])
        return None

    @staticmethod
    def get_user_with_email(user_email):
        res = supabase_sec.table('User').select('*').eq('email', user_email).execute().data
        if res:
            res = res[0]
            return User(res['id'], res['email'], res['name'])
        return None

    @staticmethod
    def wrapper_signup(email, password, name):
        print("Attempted signup", email, password)
        user = supabase_anon.auth.sign_up({"email": email, "password": password})

        dto = {
            "email": email,
            "name": name,
            "uuid": user.user.id
        }

        supabase_sec.table('User').insert(dto).execute()
        print("Signed up:", email)


class Subject:
    def __init__(self, subject_id, professor_email, subject_name):
        self.subject_id = subject_id
        self.professor_email = professor_email
        self.name = subject_name

    def get_students(self):
        # res = supabase_sec.table('StudentSubject').select('student_id, User(name, email)').eq('subject_id', self.subject_id).execute()
        res = supabase_sec.table('StudentSubject').select('student_id').eq('subject_id', self.subject_id).execute()
        students = []
        for student_dict in res.data:
            students.append(User.get_user(student_dict.get('student_id')))
        return students

    def get_assignments(self):
        res = supabase_sec.table('Assignment').select('*').eq('subject_id', self.subject_id).execute()
        assigns = []
        for r in res.data:
            assigns.append(Assignment(r['id'], r['subject_id'], r['name'], r['due_datetime']))
        return assigns 

    # Returns a specific subject using a given subject_id
    @staticmethod
    def get_subject(subject_id):
        res = supabase_sec.table('Subject').select('*').eq('id', subject_id).execute().data
        if res:
            res = res[0]
            return Subject(res['id'], res['professor_email'], res['name'])
        return None

    # Returns every subject
    @staticmethod
    def get_all_subjects():
        res = supabase_sec.table('Subject').select('*').execute()
        subs = []
        for r in res.data:
            subs.append(Subject(r['id'], r['professor_email'], r['name']))
        return subs


    def __repr__(self):
        return f'<Subject> subject_id: {self.subject_id}, prof_email: {self.professor_email}'


class Assignment:

    def __init__(self, assignment_id, subject_id, assignment_name, due_datetime=None):
        self.id = assignment_id
        self.subject_id = subject_id
        self.name = assignment_name
        self.due_datetime = datetime.datetime.strptime(due_datetime, "%Y-%m-%dT%H:%M:%S%z")
        if due_datetime:
            # Seperates datetime into date and time
            self.due_date = self.due_datetime.date()
            self.due_time = self.due_datetime.time()
        else :
            self.due_date = self.due_time = None

    # Returns a specific assignment using a given subject_id and assignment_id
    @staticmethod
    def get_assignment(subject_id, assignment_id):
        res = supabase_sec.table('Assignment').select('*').eq('id', assignment_id).eq('subject_id', subject_id).execute().data
        if res:
            res = res[0]
            return Assignment(res['id'], res['subject_id'], res['name'], res['due_datetime'])
        return None

    # Returns all assignments using a given subject_id
    @staticmethod
    def get_all_assignments(subject_id):
        res = supabase_sec.table('Assignment').select('*').eq('subject_id', subject_id).execute().data
        if res:
            return [Assignment(r['id'], r['subject_id'], r['name'], r['due_datetime']) for r in res]
        return None

    def __repr__(self):
        return f'<Assignment> name: {self.name}, assignment_id: {self.id}, subject_id: {self.subject_id}, due_datetime: {self.due_datetime}, due_date: {self.due_date}, due_time: {self.due_time}'


class Storage:

    def __init__(self, sec=supabase_sec):
        self.initialised = True
        self.supabase_sec = sec
        self.ass_bucket = 'ava-prod-assignments'

    @staticmethod
    def construct_path(subject_id, assignment_id, user_id):
        return f'{subject_id}/{assignment_id}/{user_id}'

    def upload_assignment(self, file, subject_id, assignment_id, user_id):
        path = self.construct_path(subject_id, assignment_id, user_id)
        if not self.exists_assignment_bool(subject_id, assignment_id, user_id):
            return self.supabase_sec.storage.from_(self.ass_bucket).upload(path, file)
        return None

    def download_assignment(self, subject_id, assignment_id, user_id):
        # Will return a byte stream.
        path = self.construct_path(subject_id, assignment_id, user_id)
        return self.supabase_sec.storage.from_(self.ass_bucket).download(path)

    def delete_assignment(self, subject_id, assignment_id, user_id):
        path = self.construct_path(subject_id, assignment_id, user_id)
        return self.supabase_sec.storage.from_(self.ass_bucket).remove(path)

    def exists_assignment(self, subject_id, assignment_id, user_id):
        # if the folder is empty, db returns 1 element in list[0] as a placeholder
        res = self.supabase_sec.storage.from_(self.ass_bucket).list(f'{subject_id}/{assignment_id}')
        for obj in res:
            if obj['name'] == user_id:
                return [obj]
        return []

    def exists_assignment_bool(self, subject_id, assignment_id, user_id):
        # if the folder is empty, db returns 1 element in list[0] as a placeholder
        res = self.supabase_sec.storage.from_(self.ass_bucket).list(f'{subject_id}/{assignment_id}')
        for obj in res:
            if obj['name'] == user_id:
                return True
        return False


