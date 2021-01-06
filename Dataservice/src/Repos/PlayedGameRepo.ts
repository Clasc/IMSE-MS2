import { PlayedGame } from "../Dtos/PlayedGame";
import { db, queryDb } from "../Services/db";

export class PlayedGameRepo {
    public static async getAllPlayedGames(): Promise<[PlayedGame]> {
        try {
            let queryResult: [PlayedGame] = await queryDb("SELECT * FROM PlayedGame");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new PlayedGame()];
        }
    }
    
    public static async insertPlayedGame(playedGame: PlayedGame): Promise<boolean> {
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