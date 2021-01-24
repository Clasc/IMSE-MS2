import { Cursor } from "mongodb";
import { User } from "../../Dtos/User";
import { mongoDB } from "../../Services/mongodb";
import { MongoBaseRepo } from "../MongoBaseRepo";
import { IUserRepo } from "./IUserRepo";

export class UserRepoMongo extends MongoBaseRepo implements IUserRepo {
    public async getAllUsers(): Promise<User[]> {
        let users: Cursor<User> = mongoDB.collection("User").find();
        return users.toArray();
    }

    public async getUserById(id: string): Promise<User | null> {
        let users: Cursor<User> = mongoDB.collection("User").find({ user_id: id });
        return (await users.toArray())[0];
    }

    public async getUserByUsername(username: string): Promise<User[] | null> {
        let users: Cursor<User> = mongoDB.collection("User").find({ username: username });
        return users.toArray()
    }

    public async insertUser(user: User): Promise<boolean> {
        try {
            if (!user.user_id) {
                user.user_id = (await this.increment({ collecition: "User", idField: "user_id" }));
            }

            await mongoDB.collection("User").insertOne(user);
            return true;
        }
        catch (err) {
            console.error(err);
            return false
        };
    }

    public async updateUserToken(user_id: string, token: string): Promise<boolean> {
        try {
            await mongoDB.collection("User").updateOne({ user_id: user_id }, { $set: { token: token } });
            return true;
        }
        catch (err) {
            console.error(err);
            return false
        }
    }

    public async deleteUser(userId: number): Promise<boolean> {
        try {
            await mongoDB.collection("User").deleteOne({ user_id: userId });
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
}