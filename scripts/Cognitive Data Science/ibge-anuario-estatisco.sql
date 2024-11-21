CREATE TABLE years (
    id SERIAL PRIMARY KEY,
    year INTEGER UNIQUE NOT NULL
);

CREATE TABLE sectors (
    id SERIAL PRIMARY KEY,
    sector_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE electricity_consumption (
    id SERIAL PRIMARY KEY,
    year_id INTEGER REFERENCES years(id) ON DELETE CASCADE,
    total_consumption_twh NUMERIC(10, 2) NOT NULL
);

CREATE TABLE sector_consumption (
    id SERIAL PRIMARY KEY,
    year_id INTEGER REFERENCES years(id) ON DELETE CASCADE,
    sector_id INTEGER REFERENCES sectors(id) ON DELETE CASCADE,
    percentage NUMERIC(5, 2) NOT NULL,
    absolute_twh NUMERIC(10, 2) NOT NULL
);
