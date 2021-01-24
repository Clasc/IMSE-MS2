import { Cursor } from "mongodb";
import { Rent } from "../../Dtos/Rent";
import { mongoDB } from "../../Services/mongodb";
import { MongoBaseRepo } from "../MongoBaseRepo";
import { IRentRepo } from "./IRentRepo";

export class RentRepoMongo extends MongoBaseRepo implements IRentRepo {
    public async getAllRents(): Promise<Rent[]> {
        let rents: Cursor<Rent> = mongoDB.collection("Rent").find();
        return rents.toArray();
    }

    public async insertRent(rent: Rent): Promise<boolean> {
        try {
            if (!rent.rent_id) {
                rent.rent_id = (await this.increment({ collecition: "Rent", idField: "rent_id" }));
            }

            await mongoDB.collection("Rent").insertOne(rent);
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        };
    }

    public async extendRent(rentId: number, date: string): Promise<boolean> {
        try {
            await mongoDB.collection("Rent").updateOne({ rent_id: rentId }, { $set: { expiration_date: date, extended: true } });
            return true;
        }
        catch (err) {
            console.error(err);
            return false
        }
    }

    public async getRentsByUserIdAndGameIdByExpirationDate(user_id: string, game_id: string, expiration_date: string): Promise<Rent[] | null> {
        try {
            //TODO: in general, but we have date strings for now => so comparison will not work
            let rents: Cursor<Rent> = mongoDB.collection("Rent").find({ user_id: user_id, game_id: game_id, expiration_date: { $gte: expiration_date } });
            return rents.toArray();
        }
        catch (err) {
            console.error(err);
            return null;
        };
    }
}