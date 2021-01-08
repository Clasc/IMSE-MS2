import { Response } from "express";
import { Request } from "express";
import { Login } from "../Dtos/Login";
import { LoginRepo } from "../Repos/LoginRepo";

export async function insertLogin(req: Request, res: Response) {
    let login = req.body as Login | undefined | null;

    if (!login) {
        res.status(400).send(`Request body is empty`);
        return
    }

    let success = await LoginRepo.insertLogin(login);
    res.status(success ? 200 : 500).send({ success: success });
}

export async function getAllLogins(req: Request, res: Response) {
    let logins = await LoginRepo.getAllLogins();
    res.status(200).send(logins);
}
