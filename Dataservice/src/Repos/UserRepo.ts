import { User } from "../Dtos/User";
import { db, queryDb } from "../Services/db";
export class UserRepo {
    public static async getAllUsers(): Promise<[User]> {
        try {
            let queryResult: [User] = await queryDb("SELECT * FROM User");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new User()];
        }
    }

    public static async insertUser(user: User): Promise<boolean> {
        try {
            let result: any = await queryDb(`INSERT INTO User SET ?`, user);

            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
}