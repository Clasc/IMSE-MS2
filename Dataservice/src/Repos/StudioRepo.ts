import { Studio } from "../Dtos/Studio";
import { db, queryDb } from "../Services/db";

export class StudioRepo {
    public static async getAllStudios(): Promise<[Studio]> {
        try {
            let queryResult: [Studio] = await queryDb("SELECT * FROM Studio");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new Studio()];
        }
    }
    
    public static async insertStudio(studio: Studio): Promise<boolean> {
        try {
            let result: any = await queryDb(`INSERT INTO Studio SET ?`, studio);
            return true;
        }

        catch (err) {
            console.error(err);
            return false;
        }
    }
}