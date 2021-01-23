import { Subscription } from "../../Dtos/Subscription";
import { ISubscriptionRepo } from "./ISubscriptionRepo";

export class SubscriptionRepoMongo implements ISubscriptionRepo {
    public async getAllSubscriptions(): Promise<[Subscription]> {
        throw new Error("Method not implemented.");
    }

    public async insertSubscription(subscription: Subscription): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}