import { Rent } from "../../Dtos/Rent";
import { queryDb } from "../../Services/db";
import { IRentRepo } from "./IRentRepo";

export class RentRepo implements IRentRepo {
    public async getAllRents(): Promise<Rent[]> {
        try {
            let queryResult: Rent[] = await queryDb("SELECT * FROM Rent");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new Rent()];
        }
    }

    public async insertRent(rent: Rent): Promise<boolean> {
        try {
            let result: any = await queryDb(`INSERT INTO Rent SET ?`, rent);
            return true;
        }

        catch (err) {
            console.error(err);
            return false;
        }
    }

    public async extendRent(rentId: number, date: string): Promise<boolean> {
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

    public async getRentsByUserIdAndGameIdByExpirationDate(user_id: string, game_id: string, expiration_date: string): Promise<Rent[] | null> {
        try {
            let rents: Rent[] = await queryDb(`SELECT * FROM Rent WHERE user_id = '${user_id}' AND game_id = '${game_id}' AND expiration_date >= '${expiration_date}';`);
            return rents;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

}