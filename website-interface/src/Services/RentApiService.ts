import axios from "axios";
import { Rent } from "../Dtos/Rent";
import { RestApi } from "../RestApi";

export class RentApiService {
    public static async insertRent(rent: Rent): Promise<boolean> {
        try {
            await axios
                .put(`${RestApi}/rents/`, JSON.stringify(rent), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
        }
        catch {
            console.log("unable to insert rent!");
            return false;
        };

        console.log("inserted rent!");
        return true;
    }

    public static async ableToRent(game_id: string, username: string): Promise<boolean> {
        let ableToRent = false;
        try {
            ableToRent = (await axios
                .post(`${RestApi}/ableToRent`, JSON.stringify({ username: username, game_id: game_id }), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })).data.ableToRent;
        }
        catch (err) {
            console.error(err);
            console.log("unable to check if user can rent game!");
            return false;
        };

        return ableToRent;
    }

    public static async ableToExtend(game_id: string, username: string): Promise<boolean> {
        let ableToExtend = false;
        try {
            ableToExtend = (await axios
                .post(`${RestApi}/ableToExtend`, JSON.stringify({ username: username, game_id: game_id }), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })).data.ableToExtend;
        }
        catch (err) {
            console.error(err);
            console.log("unable to check if user can extend a game rent!");
            return false;
        };

        return ableToExtend;
    }

}