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

    let errorMessage = await validateUserData(user);

    if (errorMessage) {
        res.status(200).send({ success: false, error: errorMessage });
        return;
    }

    let success = await UserApiService.insertUser(user);
    res.status(success ? 200 : 500).send({ success: success });
}

async function validateUserData(user: User): Promise<string | null> {
    let errorMessage = user.username ? null : "Username is a required field";
    errorMessage = user.first_name ? null : "first_name is a required field";
    errorMessage = user.last_name ? null : "last_name is a required field";
    errorMessage = user.password ? null : "password is a required field";
    errorMessage = user.birthday ? null : "birthday is a required field";

    let users = await UserApiService.getUserByUsername(user.username);
    console.log("userapi users:", users);
    if (users && users.length > 0) {
        return "This username already exists";
    }

    errorMessage = users.length > 0 ? "birthday is a required field" : "";

    let currentYear = new Date().getFullYear();
    let birthDate = new Date(user.birthday);
    let age = currentYear - birthDate.getFullYear();

    if (age < 18) {
        errorMessage = "You are not old enough to register";
    }
    return errorMessage;
}

