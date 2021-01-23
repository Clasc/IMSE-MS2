import { Response, Request } from "express";
import axios from "axios";
import { RestApi } from "./RestApi";

export async function migrate(req: Request, res: Response) {
    try {
        await axios
            .get(`${RestApi}/migrate`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
    }
    catch {
        console.log("uanable to migrate data!");
        return false;
    };

    console.log("data migrated");
    res.status(200).send("OK!");
}