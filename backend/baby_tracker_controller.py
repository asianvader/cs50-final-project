from db import get_db


def insert_user(username, hash):
    db = get_db()
    cursor = db.cursor()
    statement = "INSERT INTO users(username, hash) VALUES (?,?)"
    cursor.execute(statement, [username, hash])
    db.commit()
    return True