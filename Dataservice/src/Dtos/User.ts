import { PlayedGame } from "./PlayedGame";

export class User {
    user_id?: number;
    username: string = "";
    first_name?: string = "";
    last_name?: string = "";
    login_token: string = "";
    password: string = "";
    is_admin?: boolean = false;
    birthday?: string = "";
    playedGames?: PlayedGame[];
}