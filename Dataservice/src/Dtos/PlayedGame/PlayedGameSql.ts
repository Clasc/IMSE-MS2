import { PlayedGame } from "./PlayedGame";

export interface PlayedGameSql extends PlayedGame {
    game_id: number;
}