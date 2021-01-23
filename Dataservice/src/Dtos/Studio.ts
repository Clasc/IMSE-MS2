export class Studio {
    studio_id?: number;
    price?: number = 0;
    name?: string = "";
    location?: string = "";
    description?: string = "";
    games?: Array<{
        game_id?: number,
        title?: string
    }>;
}