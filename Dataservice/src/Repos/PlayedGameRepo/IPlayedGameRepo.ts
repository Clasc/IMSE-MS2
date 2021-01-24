import { PlayedGame } from "../../Dtos/PlayedGame/PlayedGame";
import { USE_MONGO_DB } from "../../USE_MONGO_DB";
import { PlayedGameRepo } from "./PlayedGameRepo";
import { PlayedGameRepoMongo } from "./PlayedGameRepoMongo";

export interface IPlayedGameRepo {
    getAllPlayedGames(): Promise<PlayedGame[]>;

    getPlayedGameBy(userId: number, gameId: number): Promise<PlayedGame[]>;

    insertPlayedGame(playedGame: PlayedGame): Promise<boolean>;
}

export function createPlayedGameRepo(): IPlayedGameRepo {
    return USE_MONGO_DB ? new PlayedGameRepoMongo() : new PlayedGameRepo();
}