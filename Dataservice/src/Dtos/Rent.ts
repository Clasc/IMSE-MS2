export class Rent {
    rent_id?: number;
    extended?: boolean = false;
    start_date?: string = "";
    expiration_date?: string = "";
    user_id?: number = 0;
    game_id?: number = 0;
    game?: {
        game_id?: number,
        title?: string,
        price?: number,
        studio?: {
            studio_id?: number,
            name?: string,
            price?: number,
        }
    };
}