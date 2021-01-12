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

    public static async extendRent(rentId: number, date: string): Promise<boolean> {
        try {
            let result: any = await queryDb(`UPDATE Rent
            SET expiration_date = '${date}', extended = true
            WHERE rent_id = '${rentId}';`);
            return true;
        }

        catch (err) {
            console.error(err);
            return false;
        }
    }

    public static async getRentsByUserId(user_id: string): Promise<[Rent] | null> {
        try {
            let rents: [Rent] = await queryDb(`SELECT * FROM Rent WHERE user_id = ${user_id}`);
            return rents;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

}