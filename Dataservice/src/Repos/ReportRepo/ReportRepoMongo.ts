import { Cursor } from "mongodb";
import { JoinedRent } from "../../Dtos/Rent/JoinedRent";
import { Rent } from "../../Dtos/Rent/Rent";
import { RentMongo } from "../../Dtos/Rent/RentMongo";
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

    createStudioReport(reportData: ReportRequest): Promise<StudioReportTableData[] | []> {
        throw new Error("Method not implemented.");
    }
}