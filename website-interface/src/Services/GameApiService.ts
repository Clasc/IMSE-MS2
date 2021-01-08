import axios from "axios";
import { Game } from "../Dtos/Game";
import { RestApi } from "../RestApi";

export class GameApiService {
    public static async insertGame(game: Game): Promise<boolean> {
        console.log(game);
        try {
            await axios
                .put(`${RestApi}/games/`, JSON.stringify(game), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
        }
        catch {
            console.log("unable to insert game!");
            return false;
        };

        console.log("inserted game!");
        return true;
    }

}