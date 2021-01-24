import { Cursor } from "mongodb";
import { Rent } from "../../Dtos/Rent/Rent";
import { RentMongo } from "../../Dtos/Rent/RentMongo";
import { RentRequest } from "../../Dtos/Rent/RentRequest";
import { mongoDB } from "../../Services/mongodb";
import { GameRepoMongo } from "../GameRepo/GameRepoMongo";
import { MongoBaseRepo } from "../MongoBaseRepo";
import { IRentRepo } from "./IRentRepo";

export class RentRepoMongo extends MongoBaseRepo implements IRentRepo {
    private readonly gameRepo = new GameRepoMongo();
    public async getAllRents(): Promise<Rent[]> {
        let rents: Cursor<Rent> = mongoDB.collection("Rent").find();
        return rents.toArray();
    }

    public async insertRent(rent: RentRequest): Promise<boolean> {
        try {
            let game = await this.gameRepo.getGameById(rent.game_id as number);
            console.log("gamebyId in  rent", game);
            if (!rent.rent_id) {
                rent.rent_id = (await this.increment({ collecition: "Rent", idField: "rent_id" }));
            }

            if (!game?.studio) {
                return false;
            }

            let newRent: RentMongo = {
                expiration_date: new Date(rent.expiration_date as string),
                extended: rent.extended,
                rent_id: rent.rent_id,
                start_date: new Date(rent.start_date as string),
                user_id: rent.user_id,
                game: {
                    game_id: game.game_id,
                    title: game.title,
                    price: game.price,
                    studio: game.studio
                }
            };
            console.log(newRent);

            await mongoDB.collection("Rent").insertOne(newRent);

            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        };
    }

    public async extendRent(rentId: number, date: string): Promise<boolean> {
        try {
            await mongoDB.collection("Rent").updateOne({ rent_id: rentId }, { $set: { expiration_date: new Date(date), extended: true } });
            return true;
        }
        catch (err) {
            console.error(err);
            return false
        }
    }

    public async getRentsByUserIdAndGameIdByExpirationDate(user_id: number, game_id: number, expiration_date: string): Promise<RentMongo[] | null> {
        try {
            //TODO: in general, but we have date strings for now => so comparison will not work
            let rents: Cursor<RentMongo> = await mongoDB.collection("Rent").find({ user_id: user_id, 'game.game_id': game_id, expiration_date: { $gte: new Date(expiration_date) } });
            let res = await rents.toArray();
            console.log("rents by exp date", res);
            return res;
        }
        catch (err) {
            console.error(err);
            return null;
        };
    }
}