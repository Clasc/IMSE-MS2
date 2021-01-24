import { UserMongo } from "../User/UserMongo";
import { RentMongo } from "./RentMongo";

export interface JoinedRent extends RentMongo {
    user: UserMongo[];
}