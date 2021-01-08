import axios from "axios";
import { PlayedGame } from "../Dtos/PlayedGame";
import { RestApi } from "../RestApi";

export class PlayedGameApiService {
    public static async insertPlayedGame(playedGame: PlayedGame): Promise<boolean> {
        console.log(playedGame);
        try {
            await axios
                .put(`${RestApi}/playedGames/`, JSON.stringify(playedGame), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
        }
        catch {
            console.log("unable to isnert playedGame!");
            return false;
        };

        console.log("inserted playedGame!");
        return true;
    }

}