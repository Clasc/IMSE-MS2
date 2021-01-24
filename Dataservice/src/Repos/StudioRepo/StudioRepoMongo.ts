import { Cursor } from "mongodb";
import { Studio } from "../../Dtos/Studio";
import { mongoDB } from "../../Services/mongodb";
import { MongoBaseRepo } from "../MongoBaseRepo";
import { IStudioRepo } from "./IStudioRepo";

export class StudioRepoMongo extends MongoBaseRepo implements IStudioRepo {
    public static async addGame(studio_id: number | undefined, game_id: number | undefined, title: string | undefined) {
        let game = {
            game_id: game_id,
            title: title
        };

        try {
            await mongoDB.collection("Studio").updateOne({ studio_id: studio_id }, { $push: { "games": game } })
            return true;
        }
        catch (err) {
            console.error(err);
            return false
        };

    }

    public async getAllStudios(): Promise<Studio[]> {
        let studios: Cursor<Studio> = mongoDB.collection("Studio").find();
        return studios.toArray();
    }

    public async insertStudio(studio: Studio): Promise<boolean> {
        try {
            if (!studio.studio_id) {
                studio.studio_id = await this.increment({ collecition: "Studio", idField: "studio_id" });
            }
            await mongoDB.collection("Studio").insertOne(studio);
            return true;
        }
        catch (err) {
            console.error(err);
            return false
        };
    }

}