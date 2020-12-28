CREATE TABLE IF NOT EXISTS imse_sql_db.User(
    user_id int NOT NULL AUTO_INCREMENT,
    first_name varchar(32),
    last_name varchar(32),
    is_admin boolean,
    birthday DATE,
    PRIMARY KEY(user_id)
);
CREATE TABLE IF NOT EXISTS imse_sql_db.Studio(
    studio_id int NOT NULL AUTO_INCREMENT,
    price int,
    name varchar(32),
    location varchar(32),
    description varchar(32),
    PRIMARY KEY(studio_id)
);
CREATE TABLE IF NOT EXISTS imse_sql_db.Game(
    game_id int NOT NULL AUTO_INCREMENT,
    genre varchar(32),
    price int,
    title varchar(32),
    studio_id int,
    PRIMARY KEY(game_id),
    FOREIGN KEY(studio_id) REFERENCES Studio(studio_id)
);
CREATE TABLE IF NOT EXISTS imse_sql_db.GameRecommendation(
    game_recommendation_id int NOT NULL AUTO_INCREMENT,
    game_id int NOT NULL,
    recommended_game_id int,
    PRIMARY KEY(game_recommendation_id),
    FOREIGN KEY(game_id) REFERENCES Game(game_id),
    FOREIGN KEY(recommended_game_id) REFERENCES Game(game_id),
);
CREATE TABLE IF NOT EXISTS imse_sql_db.Rent(
    rent_id int NOT NULL AUTO_INCREMENT,
    extended boolean,
    price int,
    start_date DATE,
    expiration_date DATE,
    user_id int,
    game_id int,
    PRIMARY KEY(rent_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id),
);
CREATE TABLE IF NOT EXISTS imse_sql_db.Subscription(
    subscription_id int NOT NULL AUTO_INCREMENT,
    start_date DATE,
    end_date DATE,
    user_id int,
    studio_id int,
    PRIMARY KEY(subscription_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (studio_id) REFERENCES Studio(studio_id),
);
CREATE TABLE IF NOT EXISTS imse_sql_db.PlayedGame(
    played_game_id int NOT NULL AUTO_INCREMENT,
    user_id int,
    playtime int,
    progress int,
    last_played DATE,
    game_id int,
    PRIMARY KEY(played_game_id, user_id),
    FOREIGN KEY(game_id) REFERENCES Game(game_id),
);