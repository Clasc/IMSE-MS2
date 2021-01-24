import { Subscription } from "../../Dtos/Subscription/Subscription";
import { SubscriptionSql } from "../../Dtos/Subscription/SubscriptionSql";
import { queryDb } from "../../Services/db";
import { ISubscriptionRepo } from "./ISubscriptionRepo";

export class SubscriptionRepo implements ISubscriptionRepo {
    public async getAllSubscriptions(): Promise<SubscriptionSql[]> {
        try {
            let queryResult: SubscriptionSql[] = await queryDb("SELECT * FROM Subscription");
            return queryResult;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    public async insertSubscription(subscription: SubscriptionSql): Promise<boolean> {
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