import { Rent } from "./Rent";

export interface RentMongo extends Rent {
    game: {
        game_id: number,
        title: string,
        price: number,
        studio: {
            studio_id: number,
            name: string,
            price: number,
        }
    };
}