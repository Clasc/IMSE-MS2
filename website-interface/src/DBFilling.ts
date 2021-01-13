import { createHash } from "crypto";
import { Request, Response } from "express";
import { UserApiService } from "./Services/UserApiService";
import { StudioApiService } from "./Services/StudioApiService";
import { GameApiService } from "./Services/GameApiService";
import { GameRecommendationApiService } from "./Services/GameRecommendationApiService";
import { RentApiService } from "./Services/RentApiService";
import { SubscriptionApiService } from "./Services/SubscriptionApiService";
import { PlayedGameApiService } from "./Services/PlayedGameApiService";

export async function fillDB(req: Request, res: Response) {
    let hash = createHash("md5");

    await UserApiService.insertUser({
        user_id: 1,
        first_name: "Simon",
        last_name: "Winter",
        login_token: "",
        username: "gameover",
        password: hash.update("asdf").digest('hex'),
        is_admin: true,
        birthday: "1992-7-31"
    });

    hash = createHash("md5");
    await UserApiService.insertUser({
        user_id: 2,
        first_name: "Hans",
        last_name: "Wurst",
        login_token: "",
        username: "huhu",
        password: hash.update("asdf").digest('hex'),
        is_admin: true,
        birthday: "1989-5-24"
    });

    let firstnames: string[] = ["James", "Mary", "John", "Jennifer", "Robert", "Lisa", "Michael",
        "Margaret", "Richard", "Sandra", "Paul", "Emily", "Thomas", "Emma",
        "George", "Laura"];
    let lastnames: string[] = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis",
        "Wilson", "Martin", "Lee", "Taylor", "Jackson", "Moore", "Harris",
        "Walker", "Young"]

    for (let i = 3; i < 23; i++) {
        hash = createHash("md5");
        await UserApiService.insertUser({
            user_id: i,
            first_name: firstnames[Math.floor(Math.random() * firstnames.length)],
            last_name: lastnames[Math.floor(Math.random() * lastnames.length)],
            login_token: "",
            username: randomString(6),
            password: hash.update("asdf").digest('hex'),
            is_admin: false,
            birthday: randomDate("1950-1-1", "2002-1-1")
        });
    }

    await StudioApiService.insertStudio({
        studio_id: 1,
        price: randomNumber(5),
        name: "Bethesda",
        location: "USA",
        description: "Designing RPGs since 1999!"
    });
    await StudioApiService.insertStudio({
        studio_id: 2,
        price: randomNumber(5),
        name: "FromSoftware",
        location: "Japan",
        description: "You died!"
    });
    await StudioApiService.insertStudio({
        studio_id: 3,
        price: randomNumber(5),
        name: "CD Projekt Red",
        location: "Poland",
        description: "Home of the Witcher..."
    });
    await StudioApiService.insertStudio({
        studio_id: 4,
        price: randomNumber(5),
        name: "Ubisoft",
        location: "France",
        description: "Animus"
    });
    await StudioApiService.insertStudio({
        studio_id: 5,
        price: randomNumber(5),
        name: "Moon Studios",
        location: "Austria",
        description: "Just beautiful."
    });

    await GameApiService.insertGame({
        game_id: 1,
        genre: "RPG",
        price: randomNumber(2),
        title: "Bloodborne",
        studio_id: 2
    });
    await GameApiService.insertGame({
        game_id: 2,
        genre: "RPG",
        price: randomNumber(2),
        title: "Dark Souls",
        studio_id: 2
    });
    await GameApiService.insertGame({
        game_id: 3,
        genre: "RPG",
        price: randomNumber(2),
        title: "Sekiro",
        studio_id: 2
    });
    await GameApiService.insertGame({
        game_id: 4,
        genre: "RPG",
        price: randomNumber(2),
        title: "Dark Souls 3",
        studio_id: 2
    });
    await GameApiService.insertGame({
        game_id: 5,
        genre: "RPG",
        price: randomNumber(2),
        title: "The Witcher: Wild Hunt",
        studio_id: 3
    });
    await GameApiService.insertGame({
        game_id: 6,
        genre: "RPG",
        price: randomNumber(2),
        title: "Cyberpunk: 2077",
        studio_id: 3
    });
    await GameApiService.insertGame({
        game_id: 7,
        genre: "RPG",
        price: randomNumber(2),
        title: "The Witcher",
        studio_id: 3
    });
    await GameApiService.insertGame({
        game_id: 8,
        genre: "RPG",
        price: randomNumber(2),
        title: "Fallout 3",
        studio_id: 1
    });
    await GameApiService.insertGame({
        game_id: 9,
        genre: "RPG",
        price: randomNumber(2),
        title: "Fallout 4",
        studio_id: 1
    });
    await GameApiService.insertGame({
        game_id: 10,
        genre: "RPG",
        price: randomNumber(2),
        title: "Fallout: New Vegas",
        studio_id: 1
    });
    await GameApiService.insertGame({
        game_id: 11,
        genre: "RPG",
        price: randomNumber(2),
        title: "The Elder Scrolls",
        studio_id: 1
    });
    await GameApiService.insertGame({
        game_id: 12,
        genre: "Adventure",
        price: randomNumber(2),
        title: "Assassin's Creed",
        studio_id: 4
    });
    await GameApiService.insertGame({
        game_id: 13,
        genre: "Adventure",
        price: randomNumber(2),
        title: "Assassin's Creed 3",
        studio_id: 4
    });
    await GameApiService.insertGame({
        game_id: 14,
        genre: "RPG",
        price: randomNumber(2),
        title: "Assassin's Creed: Valhalla",
        studio_id: 4
    });
    await GameApiService.insertGame({
        game_id: 15,
        genre: "RPG",
        price: randomNumber(2),
        title: "Watch Dog's",
        studio_id: 4
    });
    await GameApiService.insertGame({
        game_id: 16,
        genre: "Adventure",
        price: randomNumber(2),
        title: "Ori and the Will of the Wisps",
        studio_id: 5
    });
    await GameApiService.insertGame({
        game_id: 17,
        genre: "Adventure",
        price: randomNumber(2),
        title: "Ori and the Blind Forest",
        studio_id: 5
    });

    GameRecommendationApiService.insertGameRecommendation({
        game_id: 16,
        recommended_game_id: 17
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 15,
        recommended_game_id: 6
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 17,
        recommended_game_id: 2
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 17,
        recommended_game_id: 1
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 16,
        recommended_game_id: 2
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 16,
        recommended_game_id: 1
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 15,
        recommended_game_id: 14
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 14,
        recommended_game_id: 15
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 14,
        recommended_game_id: 13
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 14,
        recommended_game_id: 12
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 13,
        recommended_game_id: 14
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 13,
        recommended_game_id: 15
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 13,
        recommended_game_id: 12
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 12,
        recommended_game_id: 13
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 12,
        recommended_game_id: 14
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 12,
        recommended_game_id: 15
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 11,
        recommended_game_id: 8
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 11,
        recommended_game_id: 10
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 8,
        recommended_game_id: 10
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 8,
        recommended_game_id: 11
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 10,
        recommended_game_id: 8
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 10,
        recommended_game_id: 11
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 9,
        recommended_game_id: 8
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 9,
        recommended_game_id: 10
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 7,
        recommended_game_id: 5
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 5,
        recommended_game_id: 7
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 6,
        recommended_game_id: 5
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 5,
        recommended_game_id: 6
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 6,
        recommended_game_id: 15
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 4,
        recommended_game_id: 3
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 4,
        recommended_game_id: 2
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 4,
        recommended_game_id: 1
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 3,
        recommended_game_id: 4
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 3,
        recommended_game_id: 2
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 3,
        recommended_game_id: 1
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 2,
        recommended_game_id: 1
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 2,
        recommended_game_id: 4
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 1,
        recommended_game_id: 2
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 1,
        recommended_game_id: 3
    });
    GameRecommendationApiService.insertGameRecommendation({
        game_id: 1,
        recommended_game_id: 4
    });

    let start = randomDate("2018-9-13", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    RentApiService.insertRent({
        extended: randomBoolean(),
        start_date: start,
        expiration_date: randomDate(start, "2021-12-31"),
        user_id: 1,
        game_id: 8
    });
    PlayedGameApiService.insertPlayedGame({
        user_id: 1,
        playtime: randomNumber(200),
        progress: randomNumber(100),
        last_played: randomDate(start, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')),
        game_id: 8
    });
    start = randomDate("2018-9-13", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    RentApiService.insertRent({
        extended: randomBoolean(),
        start_date: start,
        expiration_date: randomDate(start, "2021-12-31"),
        user_id: 1,
        game_id: 5
    });

    PlayedGameApiService.insertPlayedGame({
        user_id: 1,
        playtime: randomNumber(200),
        progress: randomNumber(100),
        last_played: randomDate(start, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')),
        game_id: 5
    });
    start = randomDate("2018-9-13", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    RentApiService.insertRent({
        extended: randomBoolean(),
        start_date: start,
        expiration_date: randomDate(start, "2021-12-31"),
        user_id: 1,
        game_id: 17
    });
    PlayedGameApiService.insertPlayedGame({
        user_id: 1,
        playtime: randomNumber(200),
        progress: randomNumber(100),
        last_played: randomDate(start, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')),
        game_id: 17
    });
    start = randomDate("2018-9-13", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    SubscriptionApiService.insertSubscription({
        start_date: start,
        end_date: randomDate(start, "2021-12-31"),
        user_id: 1,
        studio_id: 2
    });
    PlayedGameApiService.insertPlayedGame({
        user_id: 1,
        playtime: randomNumber(200),
        progress: randomNumber(100),
        last_played: randomDate(start, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')),
        game_id: 1
    });

    start = randomDate("2018-9-13", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    RentApiService.insertRent({
        extended: randomBoolean(),
        start_date: start,
        expiration_date: randomDate(start, "2021-12-31"),
        user_id: 2,
        game_id: 3
    });
    PlayedGameApiService.insertPlayedGame({
        user_id: 2,
        playtime: randomNumber(200),
        progress: randomNumber(100),
        last_played: randomDate(start, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')),
        game_id: 3
    });
    start = randomDate("2018-9-13", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    RentApiService.insertRent({
        extended: randomBoolean(),
        start_date: start,
        expiration_date: randomDate(start, "2021-12-31"),
        user_id: 2,
        game_id: 2
    });
    PlayedGameApiService.insertPlayedGame({
        user_id: 2,
        playtime: randomNumber(200),
        progress: randomNumber(100),
        last_played: randomDate(start, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')),
        game_id: 2
    });
    start = randomDate("2018-9-13", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    RentApiService.insertRent({
        extended: randomBoolean(),
        start_date: start,
        expiration_date: randomDate(start, "2021-12-31"),
        user_id: 2,
        game_id: 6
    });
    PlayedGameApiService.insertPlayedGame({
        user_id: 2,
        playtime: randomNumber(200),
        progress: randomNumber(100),
        last_played: randomDate(start, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')),
        game_id: 6
    });
    start = randomDate("2018-9-13", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    SubscriptionApiService.insertSubscription({
        start_date: start,
        end_date: randomDate(start, "2021-12-31"),
        user_id: 2,
        studio_id: 1
    });
    PlayedGameApiService.insertPlayedGame({
        user_id: 2,
        playtime: randomNumber(200),
        progress: randomNumber(100),
        last_played: randomDate(start, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')),
        game_id: 9
    });

    for (let i = 3; i < 23; i++) {
        let start = randomDate("2018-9-13", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
        RentApiService.insertRent({
            extended: randomBoolean(),
            start_date: start,
            expiration_date: randomDate(start, "2021-12-31"),
            user_id: i,
            game_id: 11
        });
        PlayedGameApiService.insertPlayedGame({
            user_id: i,
            playtime: randomNumber(200),
            progress: randomNumber(100),
            last_played: randomDate(start, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')),
            game_id: 11
        });
        start = randomDate("2018-9-13", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
        RentApiService.insertRent({
            extended: randomBoolean(),
            start_date: start,
            expiration_date: randomDate(start, "2021-12-31"),
            user_id: i,
            game_id: 5
        });
        PlayedGameApiService.insertPlayedGame({
            user_id: i,
            playtime: randomNumber(200),
            progress: randomNumber(100),
            last_played: randomDate(start, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')),
            game_id: 5
        });
        start = randomDate("2018-9-13", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
        RentApiService.insertRent({
            extended: randomBoolean(),
            start_date: start,
            expiration_date: randomDate(start, "2021-12-31"),
            user_id: i,
            game_id: 14
        });
        PlayedGameApiService.insertPlayedGame({
            user_id: i,
            playtime: randomNumber(200),
            progress: randomNumber(100),
            last_played: randomDate(start, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')),
            game_id: 14
        });
        start = randomDate("2018-9-13", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
        SubscriptionApiService.insertSubscription({
            start_date: start,
            end_date: randomDate(start, "2021-12-31"),
            user_id: i,
            studio_id: 5
        });
        PlayedGameApiService.insertPlayedGame({
            user_id: i,
            playtime: randomNumber(200),
            progress: randomNumber(100),
            last_played: randomDate(start, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')),
            game_id: 16
        });
    }

    res.status(200).send("finished!");
}

function randomBoolean() {
    return Math.random() < 0.5;
}

function randomNumber(max: number) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function randomString(len: number) {
    let options = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += options.charAt(Math.floor(Math.random() * options.length));
    }
    return result;
}

function randomDate(start: string, end: string) {
    let timespan = (new Date(end).getTime() - new Date(start).getTime());
    let randomTimespan = Math.round(Math.random() * timespan);
    return new Date(randomTimespan + new Date(start).getTime()).toISOString().replace(/T/, ' ').replace(/\..+/, '');
}