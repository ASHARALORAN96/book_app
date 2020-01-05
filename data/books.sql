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
VALUES('Shame', 'Ahmad M. (aka Shackspear)', 'CDHN12345', 'https://images.unsplash.com/photo-1483193722442-5422d99849bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'Shame is good', 'drama');

INSERT INTO books (title, author, isbn, image_url, description, bookshelf) 
VALUES('The Exile', 'Rashid S.', 'FVR2345', 'https://images.unsplash.com/photo-1483193722442-5422d99849bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'Written by Rashid, its a story', 'action'); 
