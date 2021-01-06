import { Request, Response } from "express";
import { User } from "../Dtos/User";
import { UserApiService } from "../Services/UserApiService";


export async function registerUser(req: Request, res: Response) {
    let user = new User();
    if (!req.body) {
        res.status(500).send(`Request body is empty`);
        return
    }

    user.username = req.body?.username;
    user.first_name = req.body?.first_name;
    user.last_name = req.body?.last_name;
    user.password = req.body?.password;
    user.birthday = req.body?.birthday;
    let success = await UserApiService.insertUser(user);
    res.status(success ? 200 : 500).send({ success: success });
}
