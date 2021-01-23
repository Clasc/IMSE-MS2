import { Game } from "../../Dtos/Game";
import { mongoDB } from "../../Services/mongodb";
import { IGameRepo } from "./IGameRepo";


export class GameRepoMongo implements IGameRepo {

    public async getAllGames(): Promise<[Game]> {
        mongoDB.createCollection("GameRepotest");
        return [new Game()];
    }

    public async getGameById(id: string): Promise<Game | null> {
        throw new Error("Method not implemented.");
    }

    public async insertGame(game: Game): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}