import express from "express";
import { Router } from "./Router"
import * as bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.json());
console.log("website address:", process.env.WEBSITE_HOST);
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    if (process.env.WEBSITE_HOST) {
        res.setHeader('Access-Control-Allow-Origin', process.env.WEBSITE_HOST);
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

const router = new Router(app);
router.createRoutes();

app.listen(port, () => {
    console.log(`REST API running on Port ${port}`);
});