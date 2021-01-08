import axios from "axios";
import { Login } from "../Dtos/Login";
import { User } from "../Dtos/User";
import { RestApi } from "../RestApi";

export class UserApiService {
    public static async insertUser(user: User): Promise<boolean> {
        console.log(user);
        try {
            await axios
                .put(`${RestApi}/users/`, JSON.stringify(user), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
        }
        catch {
            console.log("unable to register user!");
            return false;
        };

        console.log("registered!");
        return true;
    }

    public static async getUserByUsername(username: string): Promise<[User] | null> {
        let users: [User] = [new User()];
        try {
            users = (await axios.get(`${RestApi}/users/name/${username}`)).data;
        }
        catch {
            console.log("unable to register user!");
            return null;
        };

        return users;
    }

    public static async loginUser(login: Login): Promise<boolean> {

        try {
            await axios
                .put(`${RestApi}/logins/${login.login_id}`, JSON.stringify({ userid: login.user_id, token: login.token }), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
        }
        catch {
            console.log("unable to register user!");
            return false;
        };

        console.log("registered!");
        return true;
    }

}