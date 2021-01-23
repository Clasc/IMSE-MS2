import { Subscription } from "../../Dtos/Subscription";
import { USE_MONGO_DB } from "../../USE_MONGO_DB";
import { SubscriptionRepo } from "./SubscriptionRepo";
import { SubscriptionRepoMongo } from "./SubscriptionRepoMongo";

export interface ISubscriptionRepo {
    getAllSubscriptions(): Promise<[Subscription]>;

    insertSubscription(subscription: Subscription): Promise<boolean>;
}

export function createSubscriptionRepo(): ISubscriptionRepo {
    return USE_MONGO_DB ? new SubscriptionRepoMongo() : new SubscriptionRepo();
}