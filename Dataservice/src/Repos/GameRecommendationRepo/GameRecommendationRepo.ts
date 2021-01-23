import { GameRecommendation } from "../../Dtos/GameRecommendation";
import { queryDb } from "../../Services/db";
import { IGameRecommendationRepo } from "./IGameRecommendationRepo";

export class GameRecommendationRepo implements IGameRecommendationRepo {
    public async getAllGameRecommendations(): Promise<[GameRecommendation]> {
        try {
            let queryResult: [GameRecommendation] = await queryDb("SELECT * FROM GameRecommendation");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new GameRecommendation()];
        }
    }

    public async insertGameRecommendation(gameRecommendation: GameRecommendation): Promise<boolean> {
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