import os
from supabase import create_client, Client

PAST_ASSIGNMENTS_BUCKET = 'past-assignments'


def load_from_env(variable_names: list):
    for v in variable_names:
        res = os.environ.get(v)
        if res:
            return res
    return None


url: str = load_from_env(["SUPABASE_URL", ])
secret_key: str = load_from_env(["SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEY"])

supabase_sec: Client = create_client(url, secret_key)
assert supabase_sec is not None


class DB:

    @staticmethod
    def construct_path(subject_id, assignment_id, user_id):
        return f'{subject_id}/{assignment_id}/{user_id}'

    @staticmethod
    def upload_assignment(file, subject_id, assignment_id, user_id):
        path = self.construct_path(subject_id, assignment_id, user_id)
        if not self.exists_assignment_bool(subject_id, assignment_id, user_id):
            return self.supabase_sec.storage.from_(self.ass_bucket).upload(path, file)
        return None

    @staticmethod
    def download_assignment(subject_id, assignment_id, user_id):
        # Will return a byte stream.
        path = self.construct_path(subject_id, assignment_id, user_id)
        return self.supabase_sec.storage.from_(self.ass_bucket).download(path)

    @staticmethod
    def delete_assignment(subject_id, assignment_id, user_id):
        path = self.construct_path(subject_id, assignment_id, user_id)
        return self.supabase_sec.storage.from_(self.ass_bucket).remove(path)

    @staticmethod
    def exists_assignment(subject_id, assignment_id, user_id):
        # if the folder is empty, db returns 1 element in list[0] as a placeholder
        res = self.supabase_sec.storage.from_(self.ass_bucket).list(f'{subject_id}/{assignment_id}')
        for obj in res:
            if obj['name'] == user_id:
                return [obj]
        return []

    @staticmethod
    def exists_assignment_bool(subject_id, assignment_id, user_id):
        # if the folder is empty, db returns 1 element in list[0] as a placeholder
        res = self.supabase_sec.storage.from_(self.ass_bucket).list(f'{subject_id}/{assignment_id}')
        for obj in res:
            if obj['name'] == user_id:
                return True
        return False

