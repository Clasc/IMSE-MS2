import express from "express";
import { Router } from "./Router"
import * as bodyParser from "body-parser";
import { db } from "./Services/db";

const app = express();
const port = 3000;
app.use(bodyParser.json());

const router = new Router(app);
router.createRoutes();

app.listen(port, () => {
    console.log(`REST API running on Port ${port}`);
});