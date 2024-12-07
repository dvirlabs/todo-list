DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'todo_list') THEN
        CREATE DATABASE todo_list;
    END IF;
END
$$;

\connect todo_list

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL,
    status VARCHAR(12) NOT NULL CHECK (status IN ('todo', 'in progress', 'done')),
    notes TEXT
);
