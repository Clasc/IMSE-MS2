import { Cursor } from "mongodb";
import { JoinedRent } from "../../Dtos/Rent/JoinedRent";
import { Rent } from "../../Dtos/Rent/Rent";
import { RentMongo } from "../../Dtos/Rent/RentMongo";
import { RentStudioJoin } from "../../Dtos/Rent/RentStudioJoin";
import { RentReportTableData } from "../../Dtos/RentReportTableData";
import { ReportRequest } from "../../Dtos/ReportRequest";
import { StudioReportTableData } from "../../Dtos/StudioReportTableData";
import { UserMongo } from "../../Dtos/User/UserMongo";
import { mongoDB } from "../../Services/mongodb";
import { MongoBaseRepo } from "../MongoBaseRepo";
import { IReportRepo } from "./IReportRepo";

export class ReportRepoMongo extends MongoBaseRepo implements IReportRepo {
    async createRentReport(reportData: ReportRequest): Promise<RentReportTableData[] | []> {
        let result: RentReportTableData[] | [] = [];
        try {
            let from = new Date(reportData.start_date);
            let to = new Date(reportData.end_date);
            let rents: Cursor<JoinedRent> = await mongoDB.collection("Rent").aggregate([
                {
                    $match: {
                        start_date: { $gte: from, $lte: to }
                    }
                },
                {
                    $lookup:
                    {
                        from: 'User',
                        localField: 'user_id',
                        foreignField: 'user_id',
                        as: 'user'
                    }
                },
            ]);
            result = await rents.map((rent) => {
                let played_game = rent.user[0].played_games.find(pgame => pgame.game.game_id === rent.game.game_id);
                return <RentReportTableData>{
                    expiration_date: rent.expiration_date,
                    game_id: rent.game.game_id,
                    playtime: played_game?.playtime,
                    price: rent.game.price,
                    progress: played_game?.progress,
                    user_id: rent.user_id,
                    start_date: rent.start_date,
                    username: rent.user[0].username,
                    title: rent.game.title,
                };
            }).toArray();

            return result;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async createStudioReport(reportData: ReportRequest): Promise<StudioReportTableData[] | []> {
        let result: StudioReportTableData[] | [] = [];
        try {
            let from = new Date(reportData.start_date);
            let to = new Date(reportData.end_date);
            let rent_studios: Cursor<RentStudioJoin> = await mongoDB.collection("Rent").aggregate([
                {
                    $match: {
                        start_date: { $gte: from, $lte: to }
                    }
                },
                {
                    $lookup:
                    {
                        from: 'User',
                        localField: 'user_id',
                        foreignField: 'user_id',
                        as: 'user'
                    }
                },
                {
                    $group:
                    {
                        _id: {
                            user_id: "$user_id",
                            user: { $first: "$user" },
                            studio_id: "$game.studio.studio_id",
                            studio_name: "$game.studio.name",
                            studio_price: "$game.studio.price",
                        },
                        games_prices: { $sum: "$game.price" },
                        number_of_games: { $sum: 1 }
                    }
                },
                { $sort: { "_id.user_id": 1, "_id.studio_name": 1 } }
            ]);
            result = await rent_studios.map(join => {
                return <StudioReportTableData>{
                    studio_id: join._id.studio_id,
                    name: join._id.studio_name,
                    price: join._id.studio_price,
                    user_id: join._id.user_id,
                    username: join._id.user.username,
                    games_prices: join.games_prices,
                    number_of_games: join.number_of_games,
                }
            }).toArray()
            console.log(result);
            return result;
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}