import { Cursor } from "mongodb";
import { User } from "../../Dtos/User/User";
import { UserMongo } from "../../Dtos/User/UserMongo";
import { mongoDB } from "../../Services/mongodb";
import { MongoBaseRepo } from "../MongoBaseRepo";
import { IUserRepo } from "./IUserRepo";

export class UserRepoMongo extends MongoBaseRepo implements IUserRepo {
    public async getAllUsers(): Promise<User[]> {
        let users: User[] = await mongoDB.collection("User").find().toArray();
        return users;
    }

    public async getUserById(id: string): Promise<UserMongo | null> {
        return await mongoDB.collection("User").findOne({ user_id: id });
    }

    public async getUserByUsername(username: string): Promise<UserMongo[] | null> {
        let users: Cursor<UserMongo> = await mongoDB.collection("User").find({ username: username });
        return await users.toArray()
    }

    public async insertUser(user: User): Promise<boolean> {
        try {
            if (!user.user_id) {
                user.user_id = (await this.increment({ collecition: "User", idField: "user_id" }));
            }

            let newUser: UserMongo = {
                birthday: user.birthday,
                first_name: user.first_name,
                last_name: user.last_name,
                password: user.password,
                username: user.username,
                is_admin: user.is_admin,
                user_id: user.user_id,
                played_games: [],
            };

            await mongoDB.collection("User").insertOne(newUser);
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