CREATE TABLE IF NOT EXISTS imse_sql_db.User(
    User_d int primary key not_null auto_increment,
    first_name varchar(32),
    last_name varchar(32),
    is_admin boolean,
    birthday DATE,
);
CREATE TABLE IF NOT EXISTS imse_sql_db.Studio(
    id int primary key not_null auto_increment,
    price int,
    name varchar(32),
    location varchar(32),
    description varchar(32),
);
CREATE TABLE IF NOT EXISTS imse_sql_db.Game(
    id int primary key not_null auto_increment,
    genre varchar(32),
    price int,
    title varchar(32),
    studio_id int foreign key,
);
CREATE TABLE IF NOT EXISTS imse_sql_db.GameRecommendation(
    id int primary key not_null auto_increment,
    game_id int foreign key,
    recommended_game_id int foreign key,
);
CREATE TABLE IF NOT EXISTS imse_sql_db.Rent(
    id int primary key not_null auto_increment,
    extended boolean,
    price int,
    start_date DATE,
    expiration_date DATE,
    user_id int foreign key,
    game_id int foreign key,
);
CREATE TABLE IF NOT EXISTS imse_sql_db.Subscription(
    id int primary key not_null auto_increment,
    start_date DATE,
    end_date DATE,
    user_id int foreign key,
    studio_id int foreign key,
);
CREATE TABLE IF NOT EXISTS imse_sql_db.PlayedGame(
    played_game_id int primary key not_null auto_increment,
    user_id int primary key,
    playtime int,
    progress int,
    last_played DATE,
    game_id int foreign key,
);