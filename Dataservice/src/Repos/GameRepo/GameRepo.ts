import { Game } from "../../Dtos/Game";
import { queryDb } from "../../Services/db";
import { IGameRepo } from "./IGameRepo";

export class GameRepo implements IGameRepo {
    public async getAllGames(): Promise<Game[]> {
        try {
            let queryResult: Game[] = await queryDb("SELECT * FROM Game");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new Game()];
        }
    }

    public async getGameById(id: string): Promise<Game | null> {
        try {
            let queryResult: Game[] = await queryDb(`SELECT * FROM Game WHERE game_id = ${id}`);
            return queryResult[0];
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    public async insertGame(game: Game): Promise<boolean> {
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