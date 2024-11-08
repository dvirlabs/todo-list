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
        
        # Use a context manager to handle the cursor
        with connection.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT * FROM tasks")
            rows = cur.fetchall()
            return rows

    except Exception as e:
        print(f"Error fetching data from the database: {e}")
        return []

    finally:
        # Ensure the connection is closed
        if connection:
            connection.close()
            
            
def insert_task(task, status, notes):
    try:
        connection = connect_to_db()
        
        # Use a context manager to handle the cursor
        with connection.cursor() as cur:
            cur.execute("INSERT INTO tasks (task, status, notes) VALUES (%s, %s, %s)", (task, status, notes))
            connection.commit()

    except Exception as e:
        print(f"Error inserting data into the database: {e}")

    finally:
        # Ensure the connection is closed
        if connection:
            connection.close()