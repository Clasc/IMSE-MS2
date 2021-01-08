
import { Express } from "express";
import { registerUser } from "./Controllers/UserController";
import { fillDB } from "./DBFilling";

export class Router {
    private readonly app: Express;

    constructor(app: Express) {
        this.app = app;
        this.app.get('/', (req, res) => res.send("Hello Website Interface"));

    }

    public createRoutes() {
        this.app.get("/fillDB", fillDB);

        this.app.post("/register", registerUser);
    }
}