import { PlayedGame } from "../../Dtos/PlayedGame";
import { db, queryDb } from "../../Services/db";
import { IPlayedGameRepo } from "./IPlayedGameRepo";

export class PlayedGameRepo implements IPlayedGameRepo {
    public async getAllPlayedGames(): Promise<[PlayedGame]> {
        try {
            let queryResult: [PlayedGame] = await queryDb("SELECT * FROM PlayedGame");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new PlayedGame()];
        }
    }

    public async getPlayedGameBy(userId: number, gameId: number): Promise<[PlayedGame]> {
        try {
            let queryResult: [PlayedGame] = await queryDb(`SELECT * FROM PlayedGame WHERE user_id=${userId} AND game_id=${gameId}`);
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new PlayedGame()];
        }
    }


    public async insertPlayedGame(playedGame: PlayedGame): Promise<boolean> {
        try {
            let result: any = await queryDb(`INSERT INTO PlayedGame SET ?`, playedGame);
            return true;
        }

        catch (err) {
            console.error(err);
            return false;
        }
    }

}