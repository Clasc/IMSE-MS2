import { User } from "../../Dtos/User";
import { IUserRepo } from "./IUserRepo";

export class UserRepoMongo implements IUserRepo {
    public async getAllUsers(): Promise<[User]> {
        throw new Error("Method not implemented.");
    }

    public async getUserById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    public async getUserByUsername(username: string): Promise<[User] | null> {
        throw new Error("Method not implemented.");
    }
    public async insertUser(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async updateUserToken(user_id: string, token: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async deleteUser(userId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}