CREATE TABLE User(
    id int primary key not_null auto_increment,
    first_name varchar(32),
    last_name varchar(32),
    birthday DATE,
)