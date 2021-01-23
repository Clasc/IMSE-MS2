import { Studio } from "../../Dtos/Studio";
import { USE_MONGO_DB } from "../../USE_MONGO_DB";
import { StudioRepo } from "./StudioRepo";
import { StudioRepoMongo } from "./StudioRepoMongo";

export interface IStudioRepo {
    getAllStudios(): Promise<Studio[]>;

    insertStudio(studio: Studio): Promise<boolean>;
}

export function createStudioRepo(): IStudioRepo {
    return USE_MONGO_DB ? new StudioRepoMongo() : new StudioRepo();
}