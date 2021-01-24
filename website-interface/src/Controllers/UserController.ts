import { createHash, randomBytes } from "crypto";
import { Request, Response } from "express";
import { Login } from "../Dtos/Login";
import { User } from "../Dtos/User";
import { UserApiService } from "../Services/UserApiService";
import { LoginService } from "../Services/LoginService";
import { LoginData } from "../Interfaces/LoginData";
import { validateUserData } from "../Services/ValidationService";
import { ReportRequest } from "../Interfaces/ReportData";

export async function registerUser(req: Request, res: Response) {
    let user = new User();
    if (!req.body) {
        res.status(400).send(`Request body is empty`);
        return
    }

    let errors = await validateUserData(req.body as User);

    if (errors.length > 0) {
        res.status(200).send({ success: false, errors: errors });
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
        return;
    };

    let token = randomBytes(32).toString("hex");
    hash = createHash("md5");
    token = hash.update(token + user.user_id).digest('hex');
    let login: Login = { user_id: user.user_id, token: token };
    let success = await UserApiService.loginUser(login);
    res.status(success ? 200 : 500).send({ success: success, token: token });
}

export async function loggedIn(req: Request, res: Response) {

    if (!req.body?.token || !req.body?.username) {
        res.status(200).send({ loggedIn: false });
        return
    }

    let data = req.body as LoginData;
    let loggedIn = await LoginService.userIsLoggedIn(data);
    res.status(200).send({ loggedIn: loggedIn });
}

export async function isAdmin(req: Request, res: Response) {
    if (!req.body) {
        res.status(400).send({ loggedIn: false, error: "invalid body" });
        return
    }

    let data = req.body as LoginData;
    if (!data.token || !data.username) {
        res.status(200).send({ loggedIn: false });
        return
    }

    let isAdmin = await LoginService.userIsAdmin(data);
    res.status(200).send({ isAdmin: isAdmin });
}

