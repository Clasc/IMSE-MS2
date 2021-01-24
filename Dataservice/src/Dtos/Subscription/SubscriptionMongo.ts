import { Subscription } from "./Subscription";

export interface SubscriptionMongo extends Subscription {
    studio: {
        studio_id: number,
        name: string,
        price: number
    };
}