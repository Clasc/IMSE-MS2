import { Request, Response } from "express";
import { PlayedGame } from "../Dtos/PlayedGame";
import { createPlayedGameRepo } from "../Repos/PlayedGameRepo/IPlayedGameRepo";

const playedGameRepo = createPlayedGameRepo();

export async function getAllPlayedGames(req: Request, res: Response) {
    let studios: PlayedGame[] = await playedGameRepo.getAllPlayedGames();
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

    let existingPlayedGame = await playedGameRepo.getPlayedGameBy(playedGame.user_id!, playedGame.game_id!);
    let success = true;

    if (!existingPlayedGame[0]) {
        success = await playedGameRepo.insertPlayedGame(playedGame);
    }

    res.status(success ? 200 : 500).send(`inserted a playedGame: ${success}`);
}
