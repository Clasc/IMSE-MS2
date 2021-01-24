export interface RentStudioJoin {
    _id: {
        user_id: number,
        user: {
            _id: number,
            birthday: string,
            first_name: string,
            last_name: string,
            password: string,
            username: string,
            is_admin: boolean,
            user_id: number,
            played_games: [],
        },
        studio_id: number,
        studio_name: string,
        studio_price: number
    },
    games_prices: number,
    number_of_games: number
}