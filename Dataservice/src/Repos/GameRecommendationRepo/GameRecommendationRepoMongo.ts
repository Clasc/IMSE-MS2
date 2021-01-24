import { GameRecommendation } from "../../Dtos/GameRecommendation";
import { mongoDB } from "../../Services/mongodb";
import { MongoBaseRepo } from "../MongoBaseRepo";
import { IGameRecommendationRepo } from "./IGameRecommendationRepo";

export class GameRecommendationRepoMongo extends MongoBaseRepo implements IGameRecommendationRepo {
    public async getAllGameRecommendations(): Promise<GameRecommendation[]> {
        throw new Error("Method not implemented.");
    }
    public async insertGameRecommendation(gameRecommendation: GameRecommendation): Promise<boolean> {
        let game_id = gameRecommendation.game_id;

        gameRecommendation.game_id = undefined;
        gameRecommendation.game_recommendation_id = undefined;

        try {
            await mongoDB.collection("Game").updateOne({ game_id: game_id }, { $push: { "recommended_games": gameRecommendation } })
            return true;
        }
        catch (err) {
            console.error(err);
            return false
        };
    }
}