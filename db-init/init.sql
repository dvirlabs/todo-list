CREATE DATABASE IF NOT EXISTS todo_list;

\c todo_list

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL,
    status VARCHAR(12) NOT NULL CHECK (status IN ('todo', 'in progress', 'done')),
    notes TEXT
);
