import { User } from "../../Dtos/User";
import { queryDb } from "../../Services/db";
import { IUserRepo } from "./IUserRepo";

export class UserRepo implements IUserRepo {
    public async getAllUsers(): Promise<User[]> {
        try {
            let queryResult: User[] = await queryDb("SELECT * FROM User");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new User()];
        }
    }

    public async getUserById(id: string): Promise<User | null> {
        try {
            let queryResult: User[] = await queryDb(`SELECT * FROM User WHERE user_id = ${id}`);
            return queryResult[0];
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    public async getUserByUsername(username: string): Promise<User[] | null> {
        try {
            let queryResult: User[] = await queryDb(`SELECT * FROM User WHERE username = "${username}"`);
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    public async insertUser(user: User): Promise<boolean> {
        try {
            let result: any = await queryDb(`INSERT INTO User SET ?`, user);
            return true;
        }

        catch (err) {
            console.error(err);
            return false;
        }
    }

    public async updateUserToken(user_id: string, token: string): Promise<boolean> {
        try {
            let result: any = await queryDb(`UPDATE User
            SET login_token = '${token}'
            WHERE user_id ='${user_id}';`);
            return true;
        }

        catch (err) {
            console.error(err);
            return false;
        }
    }

    public async deleteUser(userId: number): Promise<boolean> {
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