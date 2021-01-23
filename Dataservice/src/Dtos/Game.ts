export class Game {
    game_id?: number;
    genre?: string = "";
    price?: number = 0;
    title?: string = "";
    studio_id?: number = 0;
    studio?: {
        studio_id?: number,
        name?: string,
        price?: number,
    };
    recommended_games?: Array<{
        game_id?: number,
        title?: string
    }>;
}