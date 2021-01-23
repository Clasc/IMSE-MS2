import { Studio } from "../../Dtos/Studio";
import { IStudioRepo } from "./IStudioRepo";

export class StudioRepoMongo implements IStudioRepo {
    static addGame(studio_id: number | undefined, game_id: number | undefined, title: string | undefined) {
        throw new Error("Method not implemented.");
    }
    public async getAllStudios(): Promise<Studio[]> {
        throw new Error("Method not implemented.");
    }

    public async insertStudio(studio: Studio): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}