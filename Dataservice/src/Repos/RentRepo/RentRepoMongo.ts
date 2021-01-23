import { Cursor } from "mongodb";
import { Rent } from "../../Dtos/Rent";
import { mongoDB } from "../../Services/mongodb";
import { IRentRepo } from "./IRentRepo";

export class RentRepoMongo implements IRentRepo {
    public async getAllRents(): Promise<Rent[]> {
        let rents: Cursor<Rent> = mongoDB.collection("Rent").find();
        return rents.toArray();
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