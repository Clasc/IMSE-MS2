import { GameRecommendation } from "../Dtos/GameRecommendation";
import { db, queryDb } from "../Services/db";

export class GameRecommendationRepo {
    public static async getAllGameRecommendations(): Promise<[GameRecommendation]> {
        try {
            let queryResult: [GameRecommendation] = await queryDb("SELECT * FROM GameRecommendation");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new GameRecommendation()];
        }
    }
    
    public static async insertGameRecommendation(gameRecommendation: GameRecommendation): Promise<boolean> {
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