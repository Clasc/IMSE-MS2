
import { Express } from "express";

import { deleteUser, getAllUsers, getUserById, getUserByUsername, insertUser } from "./Controllers/UserController";
import { insertStudio, getAllStudios } from "./Controllers/StudioController";
import { insertGame, getAllGames } from "./Controllers/GameController";
import { insertGameRecommendation, getAllGameRecommendations } from "./Controllers/GameRecommendationController";
import { insertRent, getAllRents } from "./Controllers/RentController";
import { insertSubscription, getAllSubscriptions } from "./Controllers/SubscriptionController";
import { insertPlayedGame, getAllPlayedGames } from "./Controllers/PlayedGameController";
import { getAllLogins, insertLogin } from "./Controllers/LoginController";

export class Router {
    private readonly app: Express;

    constructor(app: Express) {
        this.app = app;
        this.app.get('/', (req, res) => res.send("Hello World"));
    }

    public createRoutes() {
        this.app.get("/users", getAllUsers);
        this.app.get("/users/:userId", getUserById);
        this.app.get("/users/name/:username", getUserByUsername);
        this.app.put("/users/:userId", insertUser);
        this.app.put("/users/", insertUser);
        this.app.delete("/users/:userId", deleteUser);

        this.app.get("/logins", getAllLogins);
        this.app.put("/logins", insertLogin);

        this.app.get("/studios", getAllStudios);
        this.app.put("/studios/:studioId", insertStudio);
        this.app.put("/studios/", insertStudio);

        this.app.get("/games", getAllGames);
        this.app.put("/games/:gameId", insertGame);
        this.app.put("/games/", insertGame);

        this.app.get("/gameRecommendations", getAllGameRecommendations);
        this.app.put("/gameRecommendations/:gameRecommendationId", insertGameRecommendation);
        this.app.put("/gameRecommendations/", insertGameRecommendation);


        this.app.get("/rents", getAllRents);
        this.app.put("/rents/:rentId", insertRent);
        this.app.put("/rents/", insertRent);

        this.app.get("/subscriptions", getAllSubscriptions);
        this.app.put("/subscriptions/:subscriptionId", insertSubscription);
        this.app.put("/subscriptions/", insertSubscription);

        this.app.get("/playedGames", getAllPlayedGames);
        this.app.put("/playedGames/_playedGameId", insertPlayedGame);
        this.app.put("/playedGames/", insertPlayedGame);

    }
}