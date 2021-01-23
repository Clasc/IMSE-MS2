import { Cursor } from "mongodb";
import { PlayedGame } from "../../Dtos/PlayedGame";
import { User } from "../../Dtos/User";
import { mongoDB } from "../../Services/mongodb";
import { IPlayedGameRepo } from "./IPlayedGameRepo";

export class PlayedGameRepoMongo implements IPlayedGameRepo {
    public async getAllPlayedGames(): Promise<PlayedGame[]> {
        // let users: Cursor<User> = await mongoDB.collection("User").mapReduce();
        // let pgames: PlayedGame[] = users.map((user) => user)
        throw new Error("Method not implemented.");
    }

    public async getPlayedGameBy(userId: number, gameId: number): Promise<PlayedGame[]> {
        try {
            let games: Cursor<PlayedGame> = await mongoDB.collection("User").find({ user_id: userId }).map((user) => user.playedGame);
            return games.toArray();
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    public async insertPlayedGame(playedGame: PlayedGame): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}