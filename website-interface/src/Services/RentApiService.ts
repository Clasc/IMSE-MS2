import axios from "axios";
import { Rent } from "../Dtos/Rent";
import { RestApi } from "../RestApi";

export class RentApiService {
    public static async insertRent(rent: Rent): Promise<boolean> {
        console.log(rent);
        try {
            await axios
                .put(`${RestApi}/rents/`, JSON.stringify(rent), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
        }
        catch {
            console.log("unable to isnert rent!");
            return false;
        };

        console.log("inserted rent!");
        return true;
    }

}