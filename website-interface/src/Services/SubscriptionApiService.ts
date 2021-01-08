import axios from "axios";
import { Subscription } from "../Dtos/Subscription";
import { RestApi } from "../RestApi";

export class SubscriptionApiService {
    public static async insertSubscription(subscription: Subscription): Promise<boolean> {
        console.log(subscription);
        try {
            await axios
                .put(`${RestApi}/subscriptions/`, JSON.stringify(subscription), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
        }
        catch {
            console.log("unable to insert subscription!");
            return false;
        };

        console.log("inserted subscription!");
        return true;
    }

}