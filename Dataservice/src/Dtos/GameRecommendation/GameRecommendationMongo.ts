import { GameRecommendation } from "./GameRecommendation";

export interface GameRecommendationMongo extends GameRecommendation {
    recommended_game_id: number;
    title: string;
}