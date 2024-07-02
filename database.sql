CREATE DATABASE PERN_PROJECT;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- download extention
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

DROP TABLE users;

-- insert users
INSERT INTO users (user_name,user_email,
user_password) VALUES ("john","john@getnada.com","Abcd@1234");