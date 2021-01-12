import { LoginData } from "../Interfaces";
import { UserApiService } from "./UserApiService";

export class LoginService {
    public static async userIsLoggedIn(data: LoginData): Promise<boolean> {
        let users = await UserApiService.getUserByUsername(data.username);
        if (!users || users.length === 0) {
            return false;
        }

        return users[0].login_token === data.token;
    }

    public static async userIsAdmin(data: LoginData): Promise<boolean> {
        let users = await UserApiService.getUserByUsername(data.username);
        if (!users || users.length === 0) {
            return false;
        }

        if (users[0].login_token !== data.token) {
            return false;
        }

        let isAdmin = users[0].is_admin === undefined ? false : users[0].is_admin;
        return isAdmin;
    }
}