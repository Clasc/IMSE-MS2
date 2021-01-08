import axios from "axios";
import { Studio } from "../Dtos/Studio";
import { RestApi } from "../RestApi";

export class StudioApiService {
    public static async insertStudio(studio: Studio): Promise<boolean> {
        console.log(studio);
        try {
            await axios
                .put(`${RestApi}/studios/`, JSON.stringify(studio), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
        }
        catch {
            console.log("unable to isnert studio!");
            return false;
        };

        console.log("inserted studio!");
        return true;
    }

}