import { Request, Response } from "express";
import { User } from "../Dtos/User";
import { UserRepo } from "../Repos/UserRepo";
import { db } from "../Services/db";

export async function getAllUsers(req: Request, res: Response) {
    let users: [User] = await UserRepo.getAllUsers();
    res.status(200).send(JSON.stringify(users));
}

export async function insertUser(req: Request, res: Response) {
    let userId = req.params.user;
    let user = req.body as User | undefined | null;
    console.log(req.params);
    console.log(user);

    if (!user) {
        res.status(500).send(`Request body is empty`);
        return
    }

    user.user_id = parseInt(userId);
    let success = await UserRepo.insertUser(user);
    let code = success ? 200 : 500;
    res.status(200).send(`inserted a user: ${success}`);
}