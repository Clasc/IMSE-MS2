import { Request, Response } from "express";
import { GameApiService } from "../Services/GameApiService";

export async function getAllGames(req: Request, res: Response) {
    const games = await GameApiService.getAllGames();
    console.log(games);

    res.status(200).send({ games: games });
}

export async function getGameById(req: Request, res: Response) {
    console.log("GameController"+req.params.gameId);
    const game = await GameApiService.getGameById(req.params.gameId);
    console.log(game);

    res.status(200).send({ game: game });
}