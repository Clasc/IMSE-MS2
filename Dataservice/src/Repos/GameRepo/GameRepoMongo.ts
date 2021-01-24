import { Game } from "../../Dtos/Game/Game";
import { GameMongo } from "../../Dtos/Game/GameMongo";
import { mongoDB } from "../../Services/mongodb";
import { MongoBaseRepo } from "../MongoBaseRepo";
import { IGameRepo } from "./IGameRepo";


export class GameRepoMongo extends MongoBaseRepo implements IGameRepo {

    public async getAllGames(): Promise<GameMongo[]> {
        return mongoDB.collection("Game").find().toArray();
    }

    public async getGameById(id: number): Promise<GameMongo | null> {
        return (await mongoDB.collection("Game").find({ game_id: id }).toArray())[0];
    }

    public async insertGame(game: GameMongo): Promise<boolean> {
        try {
            if (!game.game_id) {
                game.game_id = await this.increment({ collecition: "Game", idField: "game_id" });
            }
            await mongoDB.collection("Game").insertOne(game);
            return true;
        }
        catch (err) {
            console.error(err);
            return false
        };
    }
}