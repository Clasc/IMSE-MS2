import { Request, Response } from "express";
import { Game } from "../Dtos/Game";
import { GameRepo } from "../Repos/GameRepo";

export async function getAllGames(req: Request, res: Response) {
    let studios: [Game] = await GameRepo.getAllGames();
    res.status(200).send(JSON.stringify(studios));
}

export async function insertGame(req: Request, res: Response) {
  let gameId = req.params.gameId;
    let game = req.body as Game | undefined | null;

    if (!game) {
        res.status(500).send(`Request body is empty`);
        return
    }

    if (gameId) {
        game.game_id = parseInt(gameId);
    }
    
    let success = await GameRepo.insertGame(game);
    res.status(success ? 200 : 500).send(`inserted a game: ${success}`);
}
