import { GameRecommendation } from "../../Dtos/GameRecommendation/GameRecommendation";
import { GameRecommendationMongo } from "../../Dtos/GameRecommendation/GameRecommendationMongo";
import { GameRecommendationRequest } from "../../Dtos/GameRecommendation/GameRecommendationRequest";
import { GameRecommendationSql } from "../../Dtos/GameRecommendation/GameRecommendationSql";
import { mongoDB } from "../../Services/mongodb";
import { GameRepoMongo } from "../GameRepo/GameRepoMongo";
import { MongoBaseRepo } from "../MongoBaseRepo";
import { IGameRecommendationRepo } from "./IGameRecommendationRepo";

export class GameRecommendationRepoMongo extends MongoBaseRepo implements IGameRecommendationRepo {
    private readonly gameRepo = new GameRepoMongo();

    public async getAllGameRecommendations(): Promise<GameRecommendationMongo[]> {
        throw new Error("Method not implemented.");
    }
    public async insertGameRecommendation(gameRecommendation: GameRecommendationRequest): Promise<boolean> {
        let game_id = gameRecommendation.game_id;

        let recommendedGame = await this.gameRepo.getGameById(gameRecommendation.recommended_game_id);
        if (!recommendedGame) {
            return false;
        }

        let gameRec: GameRecommendationMongo = {
            recommended_game_id: gameRecommendation.recommended_game_id,
            title: recommendedGame.title,
        }

        try {
            await mongoDB.collection("Game").updateOne({ game_id: game_id }, { $push: { "recommended_games": gameRec } })
            return true;
        }
        catch (err) {
            console.error(err);
            return false
        };
    }
}