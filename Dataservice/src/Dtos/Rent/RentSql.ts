import { Rent } from "./Rent";

export interface RentSql extends Rent {
    game_id: number;
}