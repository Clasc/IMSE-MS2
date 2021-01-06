import { Rent } from "../Dtos/Rent";
import { db, queryDb } from "../Services/db";

export class RentRepo {
    public static async getAllRents(): Promise<[Rent]> {
        try {
            let queryResult: [Rent] = await queryDb("SELECT * FROM Rent");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new Rent()];
        }
    }
    
    public static async insertRent(rent: Rent): Promise<boolean> {
        try {
            let result: any = await queryDb(`INSERT INTO Rent SET ?`, rent);
            return true;
        }

        catch (err) {
            console.error(err);
            return false;
        }
    }
}