
import { Express } from "express";
import { deleteUser, getAllUsers, getUserById, insertUser } from "./Controllers/UserController";

export class Router {
    private readonly app: Express;

    constructor(app: Express) {
        this.app = app;
        this.app.get('/', (req, res) => res.send("Hello World"));

    }

    public createRoutes() {
        this.app.get("/users", getAllUsers);
        this.app.get("/users/:userId", getUserById);
        this.app.put("/users/:userId", insertUser);
        this.app.delete("/users/:userId", deleteUser);
    }
}