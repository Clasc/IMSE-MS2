import { Request, Response } from "express";
import { GameApiService } from "../Services/GameApiService";

export async function getAllGames(req: Request, res: Response) {
    const games = await GameApiService.getAllGames();
    res.status(200).send({ games: games });
}

export async function getGameById(req: Request, res: Response) {
    const game = await GameApiService.getGameById(req.params.gameId);
    res.status(200).send({ game: game });
}