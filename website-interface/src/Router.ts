
import { Express } from "express";
import { fillDB } from "./DBFilling";
import { loggedIn, login, registerUser } from "./Controllers/UserController";

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
    }
}