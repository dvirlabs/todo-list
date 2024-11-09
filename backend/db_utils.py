import psycopg2
from psycopg2.extras import RealDictCursor

def connect_to_db():
    conn = psycopg2.connect(
        host="192.168.10.55",
        port="5432",
        database="todo_list",
        user="postgres",
        password="Aa123456"
    )
    return conn

def close_db(conn):
    conn.close()

def get_todo_table():
    connection = None
    try:
        connection = connect_to_db()
        with connection.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT * FROM tasks")
            rows = cur.fetchall()
            return rows
    except Exception as e:
        print(f"Error fetching data from the database: {e}")
        return []
    finally:
        if connection:
            connection.close()

def insert_task(task, status, notes):
    connection = None
    try:
        connection = connect_to_db()
        with connection.cursor() as cur:
            cur.execute("INSERT INTO tasks (task, status, notes) VALUES (%s, %s, %s)", (task, status, notes))
            connection.commit()
        return {"message": "Task added successfully"}
    except Exception as e:
        print(f"Error inserting data into the database: {e}")
        return {"error": "Error inserting task"}
    finally:
        if connection:
            connection.close()

def delete_task(task_id):
    connection = None
    try:
        connection = connect_to_db()
        with connection.cursor() as cur:
            cur.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
            connection.commit()
        return {"message": "Task deleted successfully"}
    except Exception as e:
        print(f"Error deleting task: {e}")
        return {"error": "Error deleting task"}
    finally:
        if connection:
            connection.close()

def update_task(task_id, task, status, notes):
    connection = None
    try:
        connection = connect_to_db()
        with connection.cursor() as cur:
            cur.execute("UPDATE tasks SET task = %s, status = %s, notes = %s WHERE id = %s", (task, status, notes, task_id))
            connection.commit()
        return {"message": "Task updated successfully"}
    except Exception as e:
        print(f"Error updating task: {e}")
        return {"error": "Error updating task"}
    finally:
        if connection:
            connection.close()
