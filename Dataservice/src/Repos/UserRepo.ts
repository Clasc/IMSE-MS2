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

    public static async getUserById(id: string): Promise<User | null> {
        try {
            let queryResult: [User] = await queryDb(`SELECT * FROM User WHERE user_id = ${id}`);
            return queryResult[0];
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    public static async getUserByUsername(username: string): Promise<[User] | null> {
        try {
            let queryResult: [User] = await queryDb(`SELECT * FROM User WHERE username = "${username}"`);
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return null;
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

    public static async deleteUser(userId: number): Promise<boolean> {
        try {
            let result: any = await queryDb(`DELETE FROM User WHERE user_id = ${userId}`);
            return true;
        }

        catch (err) {
            console.error(err);
            return false;
        }
    }
}