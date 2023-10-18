import os
from datetime import datetime

from flask import Blueprint

from server.models import Assignment, Subject, Storage, PastStorage

cronjob = Blueprint('cronjob', __name__, template_folder=os.getcwd() + "/client/dist",
                    static_folder=os.getcwd() + "/client/dist")


@cronjob.route('/cron', methods=["GET"])
def cron():
    try:
        storage, past_storage = Storage(), PastStorage()
        all_assignments = Assignment.get_all_assignments()

        time_passed_assignments = [a for a in all_assignments if a.due_datetime
                                   and a.due_datetime <= datetime.now(
            a.due_datetime.tzinfo) and not a.submission_locked]

        for past_ass in time_passed_assignments:
            temp_subject_id = past_ass.subject_id
            temp_ass_id = past_ass.id
            current_storage = storage.cron_get_all_uploaded_assignments(temp_subject_id, temp_ass_id)
            for k in current_storage.keys():
                temp_user_id = k
                past_storage.upload_assignment(current_storage[temp_user_id], temp_user_id, temp_subject_id,
                                               temp_ass_id)

        print("Assignments checked: ", len(all_assignments))
        print("Assignments locked: ", len(time_passed_assignments))
        return {"status": 200, "message": "Successfully updated!"}

    except:
        return {"status": 300, "message": "There was an error while executing CRON!"}
