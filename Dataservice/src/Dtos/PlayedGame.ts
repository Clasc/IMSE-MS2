export class PlayedGame {
    played_game_id?: number;
    user_id?: number = 0;
    playtime?: number = 0;
    progress?: number = 0;
    last_played?: string = "";
    game_id?: number = 0;
    game?: {
        game_id?: number;
        title?: string;
    }
}