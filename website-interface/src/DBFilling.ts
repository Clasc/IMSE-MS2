import { Request, Response } from "express";
import { User } from "./Dtos/User";
import { UserApiService } from "./Services/UserApiService";


export async function fillDB(req: Request, res: Response) {
    UserApiService.insertUser({
        "first_name": "Simon",
        "last_name": "Winter",
        "username": "gameover",
        "password": "asdf",
        "is_admin": true,
        "birthday": "1992-7-31"
    }); 

    let firstnames: string[] = ["James", "Mary", "John", "Jennifer", "Robert", "Lisa", "Michael",
                                "Margaret", "Richard", "Sandra", "Paul", "Emily", "Thomas", "Emma",
                                "George", "Laura"];
    let lastnames: string[] = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis",
                                "Wilson", "Martin", "Lee", "Taylor", "Jackson", "Moore", "Harris",
                                "Walker", "Young"]

    for (let i = 0; i < 2; i++) {
        UserApiService.insertUser({
            "first_name": firstnames[Math.floor(Math.random() * firstnames.length)],
            "last_name": lastnames[Math.floor(Math.random() * lastnames.length)],
            "username": randomString(6),
            "password": "asdf",
            "is_admin": false,
            "birthday": randomDate("1950-1-1", "2002-1-1")
        }); 
    }
    res.status(200).send("finished!");
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

/*function addBodyAndInsertStudio(req: Request, res: Response,
    price: number, name: string, location: string, description: string) {
    req.body = {
        "price": price,
        "name": name,
        "location": location,
        "description": description
    }
    insertStudio(req, res);
}

function addBodyAndInsertGame(req: Request, res: Response,
    genre: string, price: number, title: string, studio_id: number) {
    req.body = {
        "genre": genre,
        "price": price,
        "title": title,
        "studio_id": studio_id
    }
    insertGame(req, res);
}

function addBodyAndInsertGameRecommendation(req: Request, res: Response,
    game_id: number, recommended_game_id: number) {
    req.body = {
        "game_id": game_id,
        "recommended_game_id": recommended_game_id
    }
    insertGameRecommendation(req, res);
}

function addBodyAndInsertRent(req: Request, res: Response,
    extended: boolean, start_date: string, expiration_date: string, user_id: number,
    game_id: number) {
    req.body = {
        "extended": extended,
        "start_date": start_date,
        "expiration_date": expiration_date,
        "user_id": user_id,
        "game_id": game_id
    }
    insertRent(req, res);
}

function addBodyAndInsertSubscription(req: Request, res: Response,
    start_date: string, end_date: string, user_id: number, studio_id: number) {
    req.body = {
        "start_date": start_date,
        "end_date": end_date,
        "user_id": user_id,
        "studio_id": studio_id
    }
    insertSubscription(req, res);
}

function addBodyAndInsertPlayedGame(req: Request, res: Response,
    user_id: number, playtime: number, progress: number, last_played: string,
    game_id: number) {
    req.body = {
        "user_id": user_id,
        "playtime": playtime,
        "progress": progress,
        "last_played": last_played,
        "game_id": game_id
    }
    insertPlayedGame(req, res);
}*/