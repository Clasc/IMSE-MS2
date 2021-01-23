import { GameRecommendation } from "../../Dtos/GameRecommendation";
import { IGameRecommendationRepo } from "./IGameRecommendationRepo";

export class GameRecommendationRepoMongo implements IGameRecommendationRepo {
    public async getAllGameRecommendations(): Promise<[GameRecommendation]> {
        throw new Error("Method not implemented.");
    }
    public async insertGameRecommendation(gameRecommendation: GameRecommendation): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}