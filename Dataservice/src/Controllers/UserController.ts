import { Request, Response } from "express";
import { User } from "../Dtos/User/User";
import { createUserRepo, IUserRepo } from "../Repos/UserRepo/IUserRepo";

const repo: IUserRepo = createUserRepo();

export async function getAllUsers(req: Request, res: Response) {
    let users: User[] = await repo.getAllUsers();
    res.status(200).send(JSON.stringify(users));
}

export async function getUserById(req: Request, res: Response) {
    if (!req.params.userId) {
        res.status(500).send(`UserId param is empty`);
        return
    }

    let user = await repo.getUserById(req.params.userId);
    res.status(user === null ? 404 : 200).send(JSON.stringify(user));
}

export async function getUserByUsername(req: Request, res: Response) {
    if (!req.params.username) {
        res.status(400).send(`Username param is empty`);
        return
    }

    let users = await repo.getUserByUsername(req.params.username);
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

    let success = await repo.insertUser(user);
    res.status(success ? 200 : 500).send(`inserted a user: ${success}`);
}

export async function addUser(req: Request, res: Response) {
    if (!req.body) {
        res.status(500).send(`Request body is empty`);
        return
    }

    console.log(req.body);
    let user: User = {
        username: req.body?.username,
        first_name: req.body?.first_name,
        last_name: req.body?.last_name,
        password: req.body?.password,
        birthday: req.body?.birthda,
    }

    let success = await repo.insertUser(user);
    res.status(success ? 200 : 500).send({ success: success });
}

export async function deleteUser(req: Request, res: Response) {
    if (!req.params.userId) {
        res.status(500).send(`UserId param is empty`);
        return
    }
    let userId = parseInt(req.params.userId);
    let success = await repo.deleteUser(userId);
    res.status(success ? 200 : 500).send(`deleted a user: ${success}`);
}

export async function login(req: Request, res: Response) {

    if (!req.body.token || !req.body.user_id) {
        res.status(400).send(`Request is invalid. Token is missing`);
        return
    }

    let success = await repo.updateUserToken(req.body.user_id, req.body.token);
    res.status(success ? 200 : 500).send({ success: success });
}
