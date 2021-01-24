import { GameRecommendation } from "./GameRecommendation";

export interface GameRecommendationSql extends GameRecommendation {
    game_id: number;
    game_recommendation_id: number;
}