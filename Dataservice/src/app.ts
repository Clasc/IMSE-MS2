import express from "express";
import { Router } from "./Router"
import * as bodyParser from "body-parser";
import { connectToMongoDB } from "./Services/mongodb";


const app = express();
const port = 8000;
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    if (process.env.WEBSITE_INTERFACE) {
        res.setHeader('Access-Control-Allow-Origin', process.env.WEBSITE_INTERFACE);
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

const router = new Router(app);
router.createRoutes();
connectToMongoDB();

app.listen(port, () => {
    console.log(`REST API running on Port ${port}`);
});