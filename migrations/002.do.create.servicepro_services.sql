DROP TYPE IF EXISTS servicetype;
CREATE TYPE servicetype AS ENUM (
    'mechanic',
    'plumbing',
    'remodling',
    'lawnscaping',
    'travel',
    'hair',
    'jobs',
    'phone'
);

CREATE TABLE servicepro_services (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    service_type servicetype NOT NULL,
    user_id INTEGER REFERENCES servicepro_users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    about TEXT NOT NULL,
    email TEXT NOT NULL,
    phone BIGINT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL
);

