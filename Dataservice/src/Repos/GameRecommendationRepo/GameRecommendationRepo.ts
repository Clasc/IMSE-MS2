import { GameRecommendation } from "../../Dtos/GameRecommendation/GameRecommendation";
import { GameRecommendationRequest } from "../../Dtos/GameRecommendation/GameRecommendationRequest";
import { GameRecommendationSql } from "../../Dtos/GameRecommendation/GameRecommendationSql";
import { queryDb } from "../../Services/db";
import { IGameRecommendationRepo } from "./IGameRecommendationRepo";

export class GameRecommendationRepo implements IGameRecommendationRepo {
    public async getAllGameRecommendations(): Promise<GameRecommendationSql[]> {
        try {
            let queryResult: GameRecommendationSql[] = await queryDb("SELECT * FROM GameRecommendation");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    public async insertGameRecommendation(gameRecommendation: GameRecommendationSql): Promise<boolean> {
        try {
            let result: any = await queryDb(`INSERT INTO GameRecommendation SET ?`, gameRecommendation);
            return true;
        }

        catch (err) {
            console.error(err);
            return false;
        }
    }
}