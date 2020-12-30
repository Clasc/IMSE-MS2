import { User } from "../Dtos/User";
import { db, queryDb } from "../Services/db";
export class UserRepo {
    public static async getAllUsers(): Promise<[User]> {
        let queryResult: [User] = await queryDb("SELECT * FROM User").then();
        if (queryResult === null) {
            return [new User()];
        }
        console.log(queryResult);
        return queryResult;
    }
}