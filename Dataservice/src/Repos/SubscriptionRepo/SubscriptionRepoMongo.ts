import { Cursor } from "mongodb";
import { Subscription } from "../../Dtos/Subscription";
import { mongoDB } from "../../Services/mongodb";
import { ISubscriptionRepo } from "./ISubscriptionRepo";

export class SubscriptionRepoMongo implements ISubscriptionRepo {
    public async getAllSubscriptions(): Promise<Subscription[]> {
        let subs: Cursor<Subscription> = mongoDB.collection("Subscription").find();
        return subs.toArray();
    }

    public async insertSubscription(subscription: Subscription): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}