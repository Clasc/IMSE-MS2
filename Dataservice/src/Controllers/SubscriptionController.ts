import { Request, Response } from "express";
import { Subscription } from "../Dtos/Subscription";
import { createSubscriptionRepo, ISubscriptionRepo } from "../Repos/SubscriptionRepo/ISubscriptionRepo";

const repo: ISubscriptionRepo = createSubscriptionRepo();

export async function getAllSubscriptions(req: Request, res: Response) {
  let studios: [Subscription] = await repo.getAllSubscriptions();
  res.status(200).send(JSON.stringify(studios));
}

export async function insertSubscription(req: Request, res: Response) {
  let subscriptionId = req.params.subscriptionId;
  let subscription = req.body as Subscription | undefined | null;

  if (!subscription) {
    res.status(500).send(`Request body is empty`);
    return
  }

  if (subscriptionId) {
    subscription.subscription_id = parseInt(subscriptionId);
  }

  let success = await repo.insertSubscription(subscription);
  res.status(success ? 200 : 500).send(`inserted a subscription: ${success}`);
}
