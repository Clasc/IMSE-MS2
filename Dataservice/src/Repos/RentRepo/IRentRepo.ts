import { Rent } from "../../Dtos/Rent";
import { USE_MONGO_DB } from "../../USE_MONGO_DB";

import { RentRepo } from "./RentRepo";
import { RentRepoMongo } from "./RentRepoMongo";

export interface IRentRepo {
    getAllRents(): Promise<Rent[]>;

    insertRent(rent: Rent): Promise<boolean>;

    extendRent(rentId: number, date: string): Promise<boolean>;

    getRentsByUserId(user_id: string): Promise<Rent[] | null>;
}

export function createRentRepo(): IRentRepo {
    return USE_MONGO_DB ? new RentRepoMongo() : new RentRepo();
}