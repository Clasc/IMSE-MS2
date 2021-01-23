import { GameRecommendation } from "../../Dtos/GameRecommendation";
import { USE_MONGO_DB } from "../../USE_MONGO_DB";
import { GameRecommendationRepo } from "./GameRecommendationRepo";
import { GameRecommendationRepoMongo } from "./GameRecommendationRepoMongo";

export interface IGameRecommendationRepo {
    getAllGameRecommendations(): Promise<GameRecommendation[]>;

    insertGameRecommendation(gameRecommendation: GameRecommendation): Promise<boolean>;
}

export function createGameRecommendationRepo(): IGameRecommendationRepo {
    return USE_MONGO_DB ? new GameRecommendationRepoMongo() : new GameRecommendationRepo();
}