from flaskr import supabase_sec
from flaskr.models.User import User


class Subject:
    def __init__(self, subject_id, professor_email, subject_name):
        self.subject_id = subject_id
        self.professor_email = professor_email
        self.subject_name = subject_name

    def get_students(self):
        # res = supabase_sec.table('StudentSubject').select('student_id, User(name, email)').eq('subject_id', self.subject_id).execute()
        res = supabase_sec.table('StudentSubject').select('student_id').eq('subject_id', self.subject_id).execute()
        students = []
        for student_dict in res.data:
            students.append(User.get_user(student_dict.get('student_id')))
        return students

    @staticmethod
    def get_subject(subject_id):
        res = supabase_sec.table('Subject').select('*').eq('id', subject_id).execute().data
        if res:
            res = res[0]
            return Subject(res['id'], res['professor_email'], res['name'])
        return None

    def __repr__(self):
        return f'<User> subject_id: {self.subject_id}, prof_email: {self.professor_email}'
