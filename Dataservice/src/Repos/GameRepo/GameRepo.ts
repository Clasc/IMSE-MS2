import { Game } from "../../Dtos/Game/Game";
import { GameSql } from "../../Dtos/Game/GameSql";
import { queryDb } from "../../Services/db";
import { IGameRepo } from "./IGameRepo";

export class GameRepo implements IGameRepo {
    public async getAllGames(): Promise<GameSql[]> {
        try {
            let queryResult: GameSql[] = await queryDb("SELECT * FROM Game");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    public async getGameById(id: number): Promise<GameSql | null> {
        try {
            let queryResult: GameSql[] = await queryDb(`SELECT * FROM Game WHERE game_id = ${id}`);
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