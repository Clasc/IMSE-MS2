import { Login } from "../Dtos/Login";
import { queryDb } from "../Services/db";

export class LoginRepo {
    public static async getAllLogins() {
        try {
            let queryResult: [Login] = await queryDb("SELECT * FROM Logins");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    public static async insertLogin(login: Login) {
        try {
            await queryDb(`INSERT INTO Logins SET ?`, login);
            return true;
        }

        catch (err) {
            console.error(err);
            return false;
        }
    }
}