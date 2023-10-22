CREATE USER api WITH ENCRYPTED PASSWORD '12345';
CREATE DATABASE users;
GRANT ALL PRIVILEGES ON DATABASE users TO api;
\connect users

CREATE TABLE users (
    id serial PRIMARY KEY,
    username text UNIQUE NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    full_name text NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO api;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO api;