import express from "express";
import { Router } from "./Router"
import { db } from "./Services/db";
const app = express();
const port = 3000;

const router = new Router(app);
router.createRoutes();


db.config;

app.listen(port, () => {
    console.log(`REST API running on Port ${port}`);
});