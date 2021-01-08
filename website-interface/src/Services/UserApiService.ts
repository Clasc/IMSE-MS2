import axios from "axios";
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
            console.log("unable to isnert user!");
            return false;
        };

        console.log("inserted user!");
        return true;
    }

}