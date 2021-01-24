import { Studio } from "./Studio";

export interface StudioMongo extends Studio {
    games: Array<{
        game_id: number,
        title: string
    }>;
}