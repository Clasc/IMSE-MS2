import { Request, Response } from "express";
import { GameRecommendation } from "../Dtos/GameRecommendation";
import { GameRecommendationRepo } from "../Repos/GameRecommendationRepo";

export async function getAllGameRecommendations(req: Request, res: Response) {
    let studios: [GameRecommendation] = await GameRecommendationRepo.getAllGameRecommendations();
    res.status(200).send(JSON.stringify(studios));
}

export async function insertGameRecommendation(req: Request, res: Response) {
  let gameRecommendationId = req.params.gameRecommendationId;
    let gameRecommendation = req.body as GameRecommendation | undefined | null;

    if (!gameRecommendation) {
        res.status(500).send(`Request body is empty`);
        return
    }

    if (gameRecommendationId) {
        gameRecommendation.game_recommendation_id = parseInt(gameRecommendationId);
    }
    
    let success = await GameRecommendationRepo.insertGameRecommendation(gameRecommendation);
    res.status(success ? 200 : 500).send(`inserted a gameRecommendation: ${success}`);
}
