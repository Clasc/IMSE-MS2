import { createHash, randomBytes } from "crypto";
import { Request, Response } from "express";
import { Login } from "../Dtos/Login";
import { User } from "../Dtos/User";
import { UserApiService } from "../Services/UserApiService";

export async function registerUser(req: Request, res: Response) {
    let user = new User();
    if (!req.body) {
        res.status(400).send(`Request body is empty`);
        return
    }

    let errorMessage = await validateUserData(req.body as User);

    if (errorMessage) {
        res.status(200).send({ success: false, error: errorMessage });
        return;
    }

    user.username = req.body?.username;
    user.first_name = req.body?.first_name;
    user.last_name = req.body?.last_name;
    let hash = createHash("md5");
    user.password = hash.update(req.body.password).digest('hex');
    user.birthday = req.body?.birthday;

    let success = await UserApiService.insertUser(user);
    res.status(success ? 200 : 500).send({ success: success });
}

export async function login(req: Request, res: Response) {
    console.log(req.body);
    if (!req.body?.password || !req.body?.username) {
        res.status(400).send(`Request body is empty`);
        return
    }

    const users = await UserApiService.getUserByUsername(req.body.username);
    console.log(users);
    if (!users || users.length === 0) {
        res.status(200).send({ success: false, error: "This user does not exist" });
        return;
    }

    let user = users[0];

    if (!user.user_id) {
        res.status(500);
        return
    }

    let hash = createHash("md5");
    if (user.password !== hash.update(req.body.password).digest('hex')) {
        res.status(401).send({ success: false, error: "Wrong password" });
    };

    let token = randomBytes(32).toString("hex");
    hash = createHash("md5");
    token = hash.update(token + user.user_id).digest('hex');
    let login: Login = { user_id: user.user_id, token: token };
    let success = await UserApiService.loginUser(login);
    res.status(success ? 200 : 500).send({ success: success, token: token });
}

export async function loggedIn(req: Request, res: Response) {
    console.log(req.body);
    if (!req.body?.token) {
        res.status(400).send(`Request body is empty`);
        return
    }


    let loginToken: string = req.body.token;

    res.status(success ? 200 : 500).send({ success: success, token: token });
}

async function validateUserData(user: User): Promise<string | null> {
    let errorMessage = user.username ? null : "Username is a required field";
    errorMessage = user.first_name ? null : "first_name is a required field";
    errorMessage = user.last_name ? null : "last_name is a required field";
    errorMessage = user.password ? null : "password is a required field";
    errorMessage = user.birthday ? null : "birthday is a required field";

    let users = await UserApiService.getUserByUsername(user.username);
    if (users && users.length > 0) {
        return "This username already exists";
    }

    let currentYear = new Date().getFullYear();
    let birthDate = new Date(user.birthday);
    let age = currentYear - birthDate.getFullYear();

    if (age < 18) {
        errorMessage = "You are not old enough to register";
    }
    return errorMessage;
}

