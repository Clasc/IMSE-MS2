import { PlayedGame } from "../PlayedGame/PlayedGame";
import { PlayedGameMongo } from "../PlayedGame/PlayedGameMongo";
import { User } from "./User";

export interface UserMongo extends User {
    played_games: PlayedGameMongo[];
}