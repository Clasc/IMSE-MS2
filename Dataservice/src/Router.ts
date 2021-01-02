
import {Express} from "express";
export class Router{
    private readonly app: Express;

    constructor(app: Express){
        this.app = app;
        this.app.get('/', (req, res)=> res.send("Hello World!!!"));
    }

    public createRoutes(){
        this.app.get("/test", (req, res)=> {res.send("This is the test subpage");});
    }
}