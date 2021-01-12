
import { Express } from "express";
import { fillDB } from "./DBFilling";
import { isAdmin, loggedIn, login, registerUser, createSubscriptionReport, createRentReport } from "./Controllers/UserController";
import { getAllGames, getGameById } from "./Controllers/GameController";
import { ableToRent, rentGame, getExpirationDate, extendRent } from "./Controllers/RentController";

export class Router {
    private readonly app: Express;

    constructor(app: Express) {
        this.app = app;
        this.app.get('/', (req, res) => res.send("Hello Website Interface"));

    }

    public createRoutes() {
        this.app.get("/fillDB", fillDB);

        this.app.post("/register", registerUser);
        this.app.post("/login", login);
        this.app.post("/logged_in", loggedIn);

        this.app.get("/games", getAllGames);
        this.app.get("/games/:gameId", getGameById);

        this.app.post("/ableToRent", ableToRent);
        this.app.post("/rentGame", rentGame);
        this.app.post("/getExpirationDate", getExpirationDate);
        this.app.post("/extendRent", extendRent);
        this.app.post("/user/is_admin", isAdmin);

        this.app.post("/report/rent", createRentReport);
        this.app.post("/report/subscription", createSubscriptionReport);
    }
}