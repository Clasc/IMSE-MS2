import { Game } from "./Game";

export interface GameMongo extends Game {
    studio?: {
        studio_id: number,
        name: string,
        price: number,
    };
    recommended_games: Array<{
        recommended_game_id: number,
        title: string
    }>;
}