import { Request, Response } from "express";
import { Rent } from "../Dtos/Rent";
import { User } from "../Dtos/User";
import { RentApiService } from "../Services/RentApiService";
import { UserApiService } from "../Services/UserApiService";

export async function ableToRent(req: Request, res: Response) {
    console.log(req.body);
    if (!req.body?.game_id || !req.body?.username) {
        res.status(200).send({ ableToRent: false });
        console.log("ableToRent: post body is empty");
        return;
    }
    
    const ableToRent = await RentApiService.ableToRent(req.body?.game_id, req.body?.username);
    const ableToExtend = await RentApiService.ableToExtend(req.body?.game_id, req.body?.username);
    res.status(200).send({ ableToRent: ableToRent, ableToExtend: ableToExtend });
}

export async function getExpirationDate(req: Request, res: Response) {
    console.log(req.body);
    if (!req.body?.game_id || !req.body?.username) {
        res.status(200).send({ ableToRent: false });
        console.log("getExpirationDate: post body is empty");
        return;
    }
    
    const date = await RentApiService.getExpirationDate(req.body?.game_id, req.body?.username);
    res.status(200).send({ date: date });
}

export async function rentGame(req: Request, res: Response) {
    console.log(req.body);
    let rent = new Rent();

    if (!req.body) {
        res.status(400).send(`Request body is empty`);
        return
    }

    let errors = await validateRentData(req.body as Rent);

    if (errors.length > 0) {
        res.status(200).send({ success: false, error: "Not all data has been given!" });
        return;
    }

    rent.extended = req.body?.extended;
    rent.start_date = req.body?.start_date;
    rent.expiration_date = req.body?.expiration_date;
    rent.game_id = req.body?.game_id;
    rent.username = req.body?.username;

    let success = await RentApiService.insertRent(rent);
    res.status(success ? 200 : 500).send({ success: success });
}

export async function extendRent(req: Request, res: Response) {
    console.log(req.body);
    let rent = new Rent();

    if (!req.body) {
        res.status(400).send(`Request body is empty`);
        return
    }

    let errors = await validateRentData(req.body as Rent);

    if (errors.length > 0) {
        res.status(200).send({ success: false, error: "Not all data has been given!" });
        return;
    }

    rent.extended = req.body?.extended;
    rent.start_date = req.body?.start_date;
    rent.expiration_date = req.body?.expiration_date;
    rent.game_id = req.body?.game_id;
    rent.username = req.body?.username;

    let success = await RentApiService.extendRent(rent);
    res.status(success ? 200 : 500).send({ success: success });
}

async function validateRentData(rent: Rent): Promise<string[]> {
    let errors: string[] = [];
    if (rent.extended == null || rent.extended == undefined) errors.push("extended is a required field");
    if (!rent.start_date) errors.push("start_date is a required field");
    if (!rent.expiration_date) errors.push("expiration_date is a required field");
    if (!rent.username) errors.push("username is a required field");
    if (!rent.game_id) errors.push("game_id is a required field");

    return errors;
}