CREATE TABLE IF NOT EXISTS User(
    user_id int NOT NULL AUTO_INCREMENT,
    first_name varchar(32),
    last_name varchar(32),
    username varchar(32) NOT NULL,
    password varchar(32) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    birthday DATE,
    PRIMARY KEY (user_id)
);
CREATE TABLE IF NOT EXISTS Studio(
    studio_id int NOT NULL AUTO_INCREMENT,
    price int,
    name varchar(32),
    location varchar(32),
    description varchar(32),
    PRIMARY KEY(studio_id)
);
CREATE TABLE IF NOT EXISTS Game(
    game_id int NOT NULL AUTO_INCREMENT,
    genre varchar(32),
    price int,
    title varchar(32),
    studio_id int,
    PRIMARY KEY(game_id),
    FOREIGN KEY(studio_id) REFERENCES Studio(studio_id)
);
CREATE TABLE IF NOT EXISTS GameRecommendation(
    game_recommendation_id int NOT NULL AUTO_INCREMENT,
    game_id int NOT NULL,
    recommended_game_id int,
    PRIMARY KEY(game_recommendation_id),
    FOREIGN KEY(game_id) REFERENCES Game(game_id),
    FOREIGN KEY(recommended_game_id) REFERENCES Game(game_id)
);
CREATE TABLE IF NOT EXISTS Rent(
    rent_id int NOT NULL AUTO_INCREMENT,
    extended boolean,
    start_date DATE,
    expiration_date DATE,
    user_id int,
    game_id int,
    PRIMARY KEY(rent_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id)
);
CREATE TABLE IF NOT EXISTS Subscription(
    subscription_id int NOT NULL AUTO_INCREMENT,
    start_date DATE,
    end_date DATE,
    user_id int,
    studio_id int,
    PRIMARY KEY(subscription_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (studio_id) REFERENCES Studio(studio_id)
);
CREATE TABLE IF NOT EXISTS PlayedGame(
    played_game_id int NOT NULL AUTO_INCREMENT,
    user_id int,
    playtime int,
    progress int,
    last_played DATE,
    game_id int,
    PRIMARY KEY(played_game_id, user_id),
    FOREIGN KEY(game_id) REFERENCES Game(game_id)
);
Create TABLE IF NOT EXISTS Logins(
    login_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    token VARCHAR(64) NOT NULL,
    PRIMARY KEY(login_id),
    FOREIGN KEY(user_id) REFERENCES User(user_id)
);