import { PlayedGame } from "./PlayedGame";

export interface PlayedGameMongo extends PlayedGame {
    game: {
        game_id: number;
        title?: string;
    }
}