import { Request, Response } from "express";
import { Rent } from "../Dtos/Rent/Rent";
import { RentRequest } from "../Dtos/Rent/RentRequest";
import { createRentRepo, IRentRepo } from "../Repos/RentRepo/IRentRepo";
import { createUserRepo, IUserRepo } from "../Repos/UserRepo/IUserRepo";

const userRepo: IUserRepo = createUserRepo();
const rentRepo: IRentRepo = createRentRepo();

export async function getAllRents(req: Request, res: Response) {
    let studios: Rent[] = await rentRepo.getAllRents();
    res.status(200).send(JSON.stringify(studios));
}

export async function insertRent(req: Request, res: Response) {
    console.log(req.body);
    let rentId = req.params.rentId;

    if (!req.body.start_date || !req.body.expiration_date || req.body.extended == null || req.body.extended == undefined || (!req.body.username && !req.body.user_id) || !req.body.game_id) {
        res.status(500).send(`Request body is empty`);
        console.log("Not all data to insert rent");
        return;
    }

    let rent: RentRequest = {
        extended: req.body.extended,
        start_date: req.body.start_date,
        expiration_date: req.body.expiration_date,
        game_id: req.body.game_id,
    };

    if (req.body.username) {
        let user = await userRepo.getUserByUsername(req.body.username);
        if (!user || !user[0].user_id) {
            res.status(400).send("Request is invalid. User not existing");
            return;
        }

        rent.user_id = user[0].user_id;
    } else {
        rent.user_id = req.body.user_id;
    }

    if (rentId) {
        rent.rent_id = parseInt(rentId);
    }

    let success = await rentRepo.insertRent(rent);
    res.status(success ? 200 : 500).send(`inserted a rent: ${success}`);
}

export async function extendRent(req: Request, res: Response) {
    console.log(req.body);

    if (!req.body.expiration_date || req.body.extended == null || req.body.extended == undefined || !req.body.username || !req.body.game_id) {
        res.status(500).send(`Request body is empty`);
        console.log("Not all data to extend rent");
        return;
    }

    let user = await userRepo.getUserByUsername(req.body.username);
    if (!user || !user[0].user_id) {
        res.status(400).send("Request is invalid. User not existing");
        return;
    }
    let id = user[0].user_id;

    let rents = await rentRepo.getRentsByUserIdAndGameIdByExpirationDate(id, parseInt(req.body.game_id), new Date().toISOString().slice(0, 10));
    console.log("rents by expiration date", rents);
    if (rents == null) {
        res.status(500).send("No rent to extend!");
        return;
    }


    let rentId = -1;
    for (let i = 0; i < rents?.length; i++) {
        rentId = rents[i].rent_id!;
    }

    let success = await rentRepo.extendRent(rentId, req.body.expiration_date);
    res.status(success ? 200 : 500).send(`extended a rent: ${success}`);
}

export async function ableToRent(req: Request, res: Response) {

    if (!req.body.game_id || !req.body.username) {
        res.status(400).send("Request is invalid. Ids are missing");
        return;
    }

    let user = await userRepo.getUserByUsername(req.body.username);
    if (!user || !user[0].user_id) {
        res.status(400).send("Request is invalid. User not existing");
        return;
    }

    let id = user[0].user_id;

    let rents = await rentRepo.getRentsByUserIdAndGameIdByExpirationDate(id, parseInt(req.body.game_id), new Date().toISOString().slice(0, 10));
    if (rents == null) {
        res.status(200).send({ ableToRent: true });
        return;
    }


    let ableToRent = true;
    for (let i = 0; i < rents?.length; i++) {
        ableToRent = false;
    }


    res.status(200).send({ ableToRent: ableToRent });
}

export async function ableToExtend(req: Request, res: Response) {

    if (!req.body.game_id || !req.body.username) {
        res.status(400).send("Request is invalid. Ids are missing");
        return;
    }

    let user = await userRepo.getUserByUsername(req.body.username);
    if (!user || !user[0].user_id) {
        res.status(400).send("Request is invalid. User not existing");
        return;
    }
    let id = user[0].user_id;

    let rents = await rentRepo.getRentsByUserIdAndGameIdByExpirationDate(id, parseInt(req.body.game_id), new Date().toISOString().slice(0, 10));
    if (rents == null) {
        res.status(200).send({ ableToExtend: false });
        return;
    }


    let ableToExtend = false;
    for (let i = 0; i < rents?.length; i++) {
        ableToExtend = true;
    }


    res.status(200).send({ ableToExtend: ableToExtend });
}

export async function getExpirationDate(req: Request, res: Response) {

    if (!req.body.game_id || !req.body.username) {
        res.status(400).send("Request is invalid. Ids are missing");
        return;
    }

    let user = await userRepo.getUserByUsername(req.body.username);
    if (!user || !user[0].user_id) {
        res.status(400).send("Request is invalid. User not existing");
        return;
    }
    let id = user[0].user_id;

    let rents = await rentRepo.getRentsByUserIdAndGameIdByExpirationDate(id, parseInt(req.body.game_id), new Date().toISOString().slice(0, 10));
    if (rents == null) {
        res.status(200).send({ date: "" });
        return;
    }


    let date = "";
    for (let i = 0; i < rents?.length; i++) {
        date = new Date(rents[i].expiration_date!).toISOString().slice(0, 10);
    }

    res.status(200).send({ date: date });
}
