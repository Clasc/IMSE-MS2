import { Rent } from "../../Dtos/Rent/Rent";
import { RentRequest } from "../../Dtos/Rent/RentRequest";
import { USE_MONGO_DB } from "../../USE_MONGO_DB";
import { RentRepo } from "./RentRepo";
import { RentRepoMongo } from "./RentRepoMongo";

export interface IRentRepo {
    getAllRents(): Promise<Rent[]>;

    insertRent(rent: RentRequest): Promise<boolean>;

    extendRent(rentId: number, date: string): Promise<boolean>;

    getRentsByUserIdAndGameIdByExpirationDate(user_id: number, game_id: number, expiration_date: string): Promise<Rent[] | null>;
}

export function createRentRepo(): IRentRepo {
    return USE_MONGO_DB ? new RentRepoMongo() : new RentRepo();
}