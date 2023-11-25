CREATE DATABASE countries_database;

CREATE TABLE countries(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    alpha2code VARCHAR(2),
    alpha3code VARCHAR(3),
    visited BOOLEAN
);