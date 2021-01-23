import { Request, Response } from "express";
import { Studio } from "../Dtos/Studio";
import { createStudioRepo, IStudioRepo } from "../Repos/StudioRepo/IStudioRepo";

const repo: IStudioRepo = createStudioRepo();

export async function getAllStudios(req: Request, res: Response) {
    let studios: Studio[] = await repo.getAllStudios();
    res.status(200).send(JSON.stringify(studios));
}

export async function insertStudio(req: Request, res: Response) {
    let studioId = req.params.studioId;
    let studio = req.body as Studio | undefined | null;

    if (!studio) {
        res.status(500).send(`Request body is empty`);
        return
    }

    if (studioId) {
        studio.studio_id = parseInt(studioId);
    }

    let success = await repo.insertStudio(studio);
    res.status(success ? 200 : 500).send(`inserted a studio: ${success}`);
}
