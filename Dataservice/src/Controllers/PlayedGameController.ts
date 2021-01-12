import { Request, Response } from "express";
import { PlayedGame } from "../Dtos/PlayedGame";
import { PlayedGameRepo } from "../Repos/PlayedGameRepo";

export async function getAllPlayedGames(req: Request, res: Response) {
    let studios: [PlayedGame] = await PlayedGameRepo.getAllPlayedGames();
    res.status(200).send(JSON.stringify(studios));
}

export async function insertPlayedGame(req: Request, res: Response) {
    let playedGameId = req.params.playedGameId;
    let playedGame = req.body as PlayedGame | undefined | null;

    if (!playedGame) {
        res.status(500).send(`Request body is empty`);
        return
    }

    if (playedGameId) {
        playedGame.played_game_id = parseInt(playedGameId);
    }

    let existingPlayedGame = await PlayedGameRepo.getPlayedGameBy(playedGame.user_id!, playedGame.game_id!);
    let success = true;

    if (!existingPlayedGame[0]) {
        success = await PlayedGameRepo.insertPlayedGame(playedGame);
    }

    res.status(success ? 200 : 500).send(`inserted a playedGame: ${success}`);
}
