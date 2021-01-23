import { Subscription } from "../../Dtos/Subscription";
import { queryDb } from "../../Services/db";
import { ISubscriptionRepo } from "./ISubscriptionRepo";

export class SubscriptionRepo implements ISubscriptionRepo {
    public async getAllSubscriptions(): Promise<Subscription[]> {
        try {
            let queryResult: Subscription[] = await queryDb("SELECT * FROM Subscription");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new Subscription()];
        }
    }

    public async insertSubscription(subscription: Subscription): Promise<boolean> {
        try {
            let result: any = await queryDb(`INSERT INTO Subscription SET ?`, subscription);
            return true;
        }

        catch (err) {
            console.error(err);
            return false;
        }
    }
}