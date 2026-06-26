CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    published BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE); -- Si se elimina un author, tambien se eliminan sus posts asociados.

