import { Subscription } from "./Subscription";

export interface SubscriptionSql extends Subscription {
    studio_id: number;
}