import { User } from "../../Dtos/User";
import { USE_MONGO_DB } from "../../USE_MONGO_DB";
import { UserRepo } from "./UserRepo";
import { UserRepoMongo } from "./UserRepoMongo";

export interface IUserRepo {
    getAllUsers(): Promise<[User]>;

    getUserById(id: string): Promise<User | null>;

    getUserByUsername(username: string): Promise<[User] | null>;

    insertUser(user: User): Promise<boolean>;

    updateUserToken(user_id: string, token: string): Promise<boolean>;

    deleteUser(userId: number): Promise<boolean>;
}

export function createUserRepo(): IUserRepo {
    return USE_MONGO_DB ? new UserRepoMongo() : new UserRepo();
}