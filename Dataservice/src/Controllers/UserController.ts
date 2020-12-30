import { Request, Response } from "express";
import { User } from "../Dtos/User";
import { UserRepo } from "../Repos/UserRepo";

export async function getAllUsers(req: Request, res: Response) {
    let users: [User] = await UserRepo.getAllUsers();
    res.send(JSON.stringify(users));
}