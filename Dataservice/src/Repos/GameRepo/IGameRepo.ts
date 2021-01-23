import { Game } from "../../Dtos/Game";
import { USE_MONGO_DB } from "../../USE_MONGO_DB";
import { GameRepo } from "./GameRepo";
import { GameRepoMongo } from "./GameRepoMongo";


export interface IGameRepo {
    getAllGames(): Promise<[Game]>;

    getGameById(id: string): Promise<Game | null>;

    insertGame(game: Game): Promise<boolean>;
}

export function createGameRepo(): IGameRepo {
    return USE_MONGO_DB ? new GameRepoMongo() : new GameRepo();
}