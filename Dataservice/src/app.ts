import express from "express";
import { Router } from "./Router"

const app = express();
const port = 3000;

const router = new Router(app);
router.createRoutes();


app.listen(port, () => {
    console.log(`REST API running on Port ${port}`);
});