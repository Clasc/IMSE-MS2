import { Rent } from "../../Dtos/Rent";
import { IRentRepo } from "./IRentRepo";

export class RentRepoMongo implements IRentRepo {
    public async getAllRents(): Promise<Rent[]> {
        throw new Error("Method not implemented.");
    }

    public async insertRent(rent: Rent): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async extendRent(rentId: number, date: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async getRentsByUserId(user_id: string): Promise<Rent[] | null> {
        throw new Error("Method not implemented.");
    }
}