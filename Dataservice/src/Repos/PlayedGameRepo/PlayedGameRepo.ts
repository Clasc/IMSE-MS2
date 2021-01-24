import { PlayedGame } from "../../Dtos/PlayedGame/PlayedGame";
import { PlayedGameSql } from "../../Dtos/PlayedGame/PlayedGameSql";
import { db, queryDb } from "../../Services/db";
import { IPlayedGameRepo } from "./IPlayedGameRepo";

export class PlayedGameRepo implements IPlayedGameRepo {
    public async getAllPlayedGames(): Promise<PlayedGameSql[]> {
        try {
            let queryResult: PlayedGameSql[] = await queryDb("SELECT * FROM PlayedGame");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    public async getPlayedGameBy(userId: number, gameId: number): Promise<PlayedGameSql[]> {
        try {
            let queryResult: PlayedGameSql[] = await queryDb(`SELECT * FROM PlayedGame WHERE user_id=${userId} AND game_id=${gameId}`);
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }


    public async insertPlayedGame(playedGame: PlayedGameSql): Promise<boolean> {
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