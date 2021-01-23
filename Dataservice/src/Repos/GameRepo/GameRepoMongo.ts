import { Game } from "../../Dtos/Game";
import { mongoDB } from "../../Services/mongodb";
import { IGameRepo } from "./IGameRepo";


export class GameRepoMongo implements IGameRepo {

    public async getAllGames(): Promise<Game[]> {
        return mongoDB.collection("Game").find().toArray();
    }

    public async getGameById(id: string): Promise<Game | null> {
        return (await mongoDB.collection("Game").find({ game_id: parseInt(id) }).toArray())[0];
    }

    public async insertGame(game: Game): Promise<boolean> {
        try {
            await mongoDB.collection("Game").insertOne(game);
            return true;
        }
        catch (err) {
            console.error(err);
            return false
        };
    }
}