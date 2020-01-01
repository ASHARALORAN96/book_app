DROP TABLE IF EXISTS books;

CREATE TABLE books(
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  isbn VARCHAR(255),
  image_url VARCHAR(255),
  description TEXT,
  bookshelf VARCHAR(255),
  due DATE NOT NULL DEFAULT NOW()
);

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) 
VALUES();