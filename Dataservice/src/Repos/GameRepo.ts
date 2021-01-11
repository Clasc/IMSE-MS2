import { Game } from "../Dtos/Game";
import { db, queryDb } from "../Services/db";

export class GameRepo {
    public static async getAllGames(): Promise<[Game]> {
        try {
            let queryResult: [Game] = await queryDb("SELECT * FROM Game");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new Game()];
        }
    }

    public static async getGameById(id: string): Promise<Game | null> {
        try {
            let queryResult: [Game] = await queryDb(`SELECT * FROM Game WHERE game_id = ${id}`);
            return queryResult[0];
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    
    public static async insertGame(game: Game): Promise<boolean> {
        try {
            let result: any = await queryDb(`INSERT INTO Game SET ?`, game);
            return true;
        }

        catch (err) {
            console.error(err);
            return false;
        }
    }
}