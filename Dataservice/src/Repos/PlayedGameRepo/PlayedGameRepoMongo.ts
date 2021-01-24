import { Cursor } from "mongodb";
import { PlayedGame } from "../../Dtos/PlayedGame/PlayedGame";
import { PlayedGameMongo } from "../../Dtos/PlayedGame/PlayedGameMongo";
import { PlayedGameRequest } from "../../Dtos/PlayedGame/PlayedGameRequest";
import { UserMongo } from "../../Dtos/User/UserMongo";
import { mongoDB } from "../../Services/mongodb";
import { GameRepoMongo } from "../GameRepo/GameRepoMongo";
import { MongoBaseRepo } from "../MongoBaseRepo";
import { IPlayedGameRepo } from "./IPlayedGameRepo";

export class PlayedGameRepoMongo extends MongoBaseRepo implements IPlayedGameRepo {
    private readonly gameRepo = new GameRepoMongo();

    public async getAllPlayedGames(): Promise<PlayedGame[]> {
        throw new Error("Method not implemented.");
    }

    public async getPlayedGameBy(userId: number, gameId: number): Promise<PlayedGame[]> {
        try {
            let users: Cursor<UserMongo> = await mongoDB.collection("User").find({ 'user_id': userId, 'played_games.game.game_id': gameId}).project({_id:0, played_games: {$elemMatch: {'game.game_id': gameId}}});
            let game = (await users.toArray())[0];
            if (!game) {
                return [];
            }
            return game.played_games;
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