import { Request, Response } from "express";
import { Game } from "../Dtos/Game/Game";
import { GameRepo } from "../Repos/GameRepo/GameRepo";
import { createGameRepo } from "../Repos/GameRepo/IGameRepo";
const gameRepo = createGameRepo();

export async function getAllGames(req: Request, res: Response) {
    let games: Game[] = await gameRepo.getAllGames();
    res.status(200).send(JSON.stringify(games));
}

export async function getGameById(req: Request, res: Response) {
    if (!req.params.gameId) {
        res.status(500).send(`GameId param is empty`);
        return
    }

    let game = await gameRepo.getGameById(parseInt(req.params.gameId));
    res.status(game === null ? 404 : 200).send(JSON.stringify(game));
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

    let success = await gameRepo.insertGame(game);
    res.status(success ? 200 : 500).send(`inserted a game: ${success}`);
}
