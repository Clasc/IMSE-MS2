import { GameRecommendation } from "./GameRecommendation";

export interface GameRecommendationMongo extends GameRecommendation {
    title: string;
}