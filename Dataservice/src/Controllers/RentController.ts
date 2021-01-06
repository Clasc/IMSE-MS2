import { Request, Response } from "express";
import { Rent } from "../Dtos/Rent";
import { RentRepo } from "../Repos/RentRepo";

export async function getAllRents(req: Request, res: Response) {
    let studios: [Rent] = await RentRepo.getAllRents();
    res.status(200).send(JSON.stringify(studios));
}

export async function insertRent(req: Request, res: Response) {
  let rentId = req.params.rentId;
    let rent = req.body as Rent | undefined | null;

    if (!rent) {
        res.status(500).send(`Request body is empty`);
        return
    }

    if (rentId) {
        rent.rent_id = parseInt(rentId);
    }
    
    let success = await RentRepo.insertRent(rent);
    res.status(success ? 200 : 500).send(`inserted a rent: ${success}`);
}
