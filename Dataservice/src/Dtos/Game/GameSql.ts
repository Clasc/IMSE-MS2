import { Game } from "./Game";

export interface GameSql extends Game {
    studio_id: number;
}