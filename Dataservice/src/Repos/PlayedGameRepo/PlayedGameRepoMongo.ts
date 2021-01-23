import { PlayedGame } from "../../Dtos/PlayedGame";
import { IPlayedGameRepo } from "./IPlayedGameRepo";

export class PlayedGameRepoMongo implements IPlayedGameRepo {
    public async getAllPlayedGames(): Promise<PlayedGame[]> {
        throw new Error("Method not implemented.");
    }

    public async getPlayedGameBy(userId: number, gameId: number): Promise<PlayedGame[]> {
        throw new Error("Method not implemented.");
    }

    public async insertPlayedGame(playedGame: PlayedGame): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}