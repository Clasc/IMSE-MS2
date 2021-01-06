import axios from "axios";
import { User } from "../Dtos/User";
import { RestApi } from "../RestApi";

export class UserApiService {
    public static async addUser(user: User): Promise<boolean> {
        console.log(user);
        console.log(RestApi);
        try {
            await axios
                .post(`${RestApi}/add/user`, JSON.stringify(user), {
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