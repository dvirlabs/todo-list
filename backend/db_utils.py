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
    
# def get_todo_table():
#     conn = connect_to_db()
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM tasks")
#     rows = cur.fetchall()
#     close_db(conn)
#     return rows


def get_todo_table():
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