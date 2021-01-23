export class Subscription {
    subscription_id?: number;
    start_date?: string = "";
    end_date?: string = "";
    user_id?: number = 0;
    studio_id?: number = 0;
    studio?: {
        studio_id?: number,
        name?: string,
        price?: number
    };
}