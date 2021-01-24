import { PlayedGame } from "./PlayedGame";

export interface PlayedGameSql extends PlayedGame {
    played_game_id?: number;
    user_id?: number;
    game_id: number;
}