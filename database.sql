CREATE DATABASE spaces;

CREATE TABLE desks(
  id SERIAL PRIMARY KEY,
  username VARCHAR(40),
  image TEXT
);

CREATE TABLE users(
  user_id SERIAL,
  user_name VARCHAR(40) NOT NULL,
  user_email VARCHAR(40) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
);
