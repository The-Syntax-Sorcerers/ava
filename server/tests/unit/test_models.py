from server.models import User, Subject, Assignment
import datetime


# Checks whether a new user can be made
def test_new_user():
    # GIVEN a user object
    # WHEN a new user is created
    # THEN check that user has a tid, an email, and a name
    user = User(1, 'test@email.com', 'Test User')
    assert user.id == 1
    assert user.email == 'test@email.com'
    assert user.name == 'Test User'


def test_new_subject():
    # GIVEN a subject object
    # WHEN a new subject is created
    # THEN check that subject has a subject_id, a professor_email, and a name
    subject = Subject(1, 'Test Subject', 'test@email.com', 'Test Subject')
    assert subject.subject_id == 1
    assert subject.professor_email == 'test@email.com'
    assert subject.name == 'Test Subject'


def test_new_assignment_no_due_datetime():
    # GIVEN an assignment object
    # WHEN a new assignment is created with no due_datetime
    # THEN check that subject has an id, a subject_id, and a name
    assignment = Assignment(1, 2, "Test Assignment", "Test subject description", False)
    assert assignment.id == 1
    assert assignment.subject_id == 2
    assert assignment.name == "Test Assignment"
    assert assignment.due_datetime is None


def test_new_assignment_due_datetime():
    # GIVEN an assignment object
    # WHEN a new assignment is created with a due_datetime
    # THEN check that subject has an id, a subject_id, a name, a due date, and a due_time
    assignment = Assignment(1, 2, "Test Assignment", "Test subject description", False, "2023-09-06T11:07:23+00:00")
    assert assignment.id == 1
    assert assignment.subject_id == 2
    assert assignment.name == "Test Assignment"
    assert assignment.due_datetime == datetime.datetime(2023, 9, 6, 11, 7, 23, tzinfo=datetime.timezone.utc)
    assert assignment.due_date == datetime.date(2023, 9, 6)
    assert assignment.due_time == datetime.time(11, 7, 23)

    # GIVEN an assignment object
    # WHEN a new assignment is created with a due_datetime (hour greater than 12)
    # THEN check that subject has an id, a subject_id, a name, a due date, and a due_time
    assignment = Assignment(1, 2, "Test Assignment", "Test subject description", False, "2023-09-06T13:07:23+00:00")
    assert assignment.id == 1
    assert assignment.subject_id == 2
    assert assignment.name == "Test Assignment"
    assert assignment.due_datetime == datetime.datetime(2023, 9, 6, 13, 7, 23, tzinfo=datetime.timezone.utc)
    assert assignment.due_date == datetime.date(2023, 9, 6)
    assert assignment.due_time == datetime.time(13, 7, 23)
