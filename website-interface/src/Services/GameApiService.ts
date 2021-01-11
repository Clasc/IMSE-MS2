import axios from "axios";
import { Game } from "../Dtos/Game";
import { RestApi } from "../RestApi";

export class GameApiService {
    public static async getGameById(id: string): Promise<Game | null> {
        let game = new Game();
        try {
            game = (await axios.get(`${RestApi}/games/${id}`)).data;
        }
        catch {
            console.log("unable to get game!");
            return null;
        };

        return game;
    }

    public static async getAllGames(): Promise<[Game] | []> {
        let games: [Game] = [new Game()]
        try {
            games = (await axios.get(`${RestApi}/games`)).data;
        }
        catch {
            console.log("unable to get games!");
            return [];
        };

        return games;
    }
}