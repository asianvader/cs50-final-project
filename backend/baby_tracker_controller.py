from db import get_db
import sqlite3


def insert_user(username, hash):
    db = get_db()
    cursor = db.cursor()
    statement = "INSERT INTO users(username, hash) VALUES (?,?)"
    cursor.execute(statement, [username, hash])
    db.commit()
    return True


def check_user(username):
    db = get_db()
    cursor = db.cursor()
    cursor.row_factory = sqlite3.Row
    print('check')
    statement = "SELECT * FROM users WHERE username = ?"
    values = cursor.execute(statement, [username]).fetchall()
    convert_data = []
    # Loop through to extract column headings and output as a dictionary
    for item in values:
        convert_data.append({k: item[k] for k in item.keys()})
    return convert_data