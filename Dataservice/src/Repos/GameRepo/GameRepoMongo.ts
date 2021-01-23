import { Game } from "../../Dtos/Game";
import { IGameRepo } from "./IGameRepo";

export class GameRepoMongo implements IGameRepo {
    public async getAllGames(): Promise<[Game]> {
        throw new Error("Method not implemented.");
    }

    public async getGameById(id: string): Promise<Game | null> {
        throw new Error("Method not implemented.");
    }

    public async insertGame(game: Game): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}