import axios from "axios";
import { GameRecommendation } from "../Dtos/GameRecommendation";
import { RestApi } from "../RestApi";

export class GameRecommendationApiService {
    public static async insertGameRecommendation(gameRecommendation: GameRecommendation): Promise<boolean> {
        console.log(gameRecommendation);
        try {
            await axios
                .put(`${RestApi}/gameRecommendations/`, JSON.stringify(gameRecommendation), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
        }
        catch {
            console.log("unable to isnert gameRecommendation!");
            return false;
        };

        console.log("inserted gameRecommendation!");
        return true;
    }

}