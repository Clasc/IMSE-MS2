import { Studio } from "../../Dtos/Studio";
import { queryDb } from "../../Services/db";
import { IStudioRepo } from "./IStudioRepo";

export class StudioRepo implements IStudioRepo {
    public async getAllStudios(): Promise<[Studio]> {
        try {
            let queryResult: [Studio] = await queryDb("SELECT * FROM Studio");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new Studio()];
        }
    }

    public async insertStudio(studio: Studio): Promise<boolean> {
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