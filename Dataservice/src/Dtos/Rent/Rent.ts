export interface Rent {
    rent_id?: number;
    extended?: boolean;
    start_date?: string;
    expiration_date?: string;
    user_id?: number;
    game_id?: number;
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