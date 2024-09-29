CREATE TABLE user(
    user_id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE address(
    address_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    address TEXT,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

