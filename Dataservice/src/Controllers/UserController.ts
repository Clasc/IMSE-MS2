import { Request, Response } from "express";
import { User } from "../Dtos/User";
import { UserRepo } from "../Repos/UserRepo";

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

export async function getUserByUsername(req: Request, res: Response) {
    if (!req.params.username) {
        res.status(400).send(`Username param is empty`);
        return
    }

    let users = await UserRepo.getUserByUsername(req.params.username);
    res.status(users === null ? 500 : 200).send(JSON.stringify(users));
}

export async function insertUser(req: Request, res: Response) {
    let userId = req.params.userId;
    let user = req.body as User | undefined | null;

    if (!user) {
        res.status(500).send(`Request body is empty`);
        return
    }

    if (userId) {
        user.user_id = parseInt(userId);
    }

    let success = await UserRepo.insertUser(user);
    res.status(success ? 200 : 500).send(`inserted a user: ${success}`);
}

export async function addUser(req: Request, res: Response) {
    let user = new User();
    if (!req.body) {
        res.status(500).send(`Request body is empty`);
        return
    }

    console.log(req.body);
    user.username = req.body?.username;
    user.first_name = req.body?.first_name;
    user.last_name = req.body?.last_name;
    user.password = req.body?.password;
    user.birthday = req.body?.birthday

    let success = await UserRepo.insertUser(user);
    res.status(success ? 200 : 500).send({ success: success });
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