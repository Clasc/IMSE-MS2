import { Subscription } from "../Dtos/Subscription";
import { db, queryDb } from "../Services/db";

export class SubscriptionRepo {
    public static async getAllSubscriptions(): Promise<[Subscription]> {
        try {
            let queryResult: [Subscription] = await queryDb("SELECT * FROM Subscription");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [new Subscription()];
        }
    }
    
    public static async insertSubscription(subscription: Subscription): Promise<boolean> {
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