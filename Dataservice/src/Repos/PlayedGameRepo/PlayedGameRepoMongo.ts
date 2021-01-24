import { Cursor } from "mongodb";
import { PlayedGame } from "../../Dtos/PlayedGame/PlayedGame";
import { PlayedGameMongo } from "../../Dtos/PlayedGame/PlayedGameMongo";
import { PlayedGameRequest } from "../../Dtos/PlayedGame/PlayedGameRequest";
import { User } from "../../Dtos/User/User";
import { UserMongo } from "../../Dtos/User/UserMongo";
import { mongoDB } from "../../Services/mongodb";
import { GameRepoMongo } from "../GameRepo/GameRepoMongo";
import { MongoBaseRepo } from "../MongoBaseRepo";
import { IPlayedGameRepo } from "./IPlayedGameRepo";

export class PlayedGameRepoMongo extends MongoBaseRepo implements IPlayedGameRepo {
    private readonly gameRepo = new GameRepoMongo();

    public async getAllPlayedGames(): Promise<PlayedGame[]> {
        // let users: Cursor<User> = await mongoDB.collection("User").mapReduce();
        // let pgames: PlayedGame[] = users.map((user) => user)
        throw new Error("Method not implemented.");
    }

    public async getPlayedGameBy(userId: number, gameId: number): Promise<PlayedGame[]> {
        try {
            let games: Cursor<PlayedGame> = await mongoDB.collection("User").find({ user_id: userId }).map((user) => user.played_games);
            return games.toArray();
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    public async insertPlayedGame(playedGame: PlayedGameRequest): Promise<boolean> {
        let user_id = playedGame.user_id;
        let game = await this.gameRepo.getGameById(playedGame.game_id);

        let newPlayedGame: PlayedGameMongo = {
            last_played: playedGame.last_played,
            playtime: playedGame.playtime,
            progress: playedGame.progress,
            game: {
                game_id: playedGame.game_id,
                title: game?.title
            }
        }

        try {
            await mongoDB.collection("User").updateOne({ user_id: user_id }, { $push: { "played_games": newPlayedGame } })
            return true;
        }
        catch (err) {
            console.error(err);
            return false
        };
    }
}