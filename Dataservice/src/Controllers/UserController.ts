import { Request, Response } from "express";
import { User } from "../Dtos/User";
import { UserRepo } from "../Repos/UserRepo";
import { db } from "../Services/db";

export async function getAllUsers(req: Request, res: Response) {
    let users: [User] = await UserRepo.getAllUsers();
    res.status(200).send(JSON.stringify(users));
}

export async function getUserById(req: Request, res: Response) {
    if (!req.params.userId) {
        res.status(500).send(`UserId param is empty`);
        return
    }

    let user = await UserRepo.getUserById(req.params.userId);
    res.status(user === null ? 404 : 200).send(JSON.stringify(user));
}

export async function insertUser(req: Request, res: Response) {
    let userId = req.params.user;
    let user = req.body as User | undefined | null;

    if (!user) {
        res.status(500).send(`Request body is empty`);
        return
    }

    user.user_id = parseInt(userId);
    let success = await UserRepo.insertUser(user);
    res.status(success ? 200 : 500).send(`inserted a user: ${success}`);
}

export async function deleteUser(req: Request, res: Response) {
    if (!req.params.userId) {
        res.status(500).send(`UserId param is empty`);
        return
    }
    let userId = parseInt(req.params.userId);
    let success = await UserRepo.deleteUser(userId);
    res.status(success ? 200 : 500).send(`deleted a user: ${success}`);
}