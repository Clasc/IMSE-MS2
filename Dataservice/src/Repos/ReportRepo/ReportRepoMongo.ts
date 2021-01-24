import { Cursor } from "mongodb";
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
            let rents: Cursor<RentMongo> = await mongoDB.collection("Rent")
                .find({ start_date: { $gte: from, $lte: to } });
            let userData: UserMongo[] = await mongoDB.collection("User").find({}).toArray();
            result = await rents.map((rent) => {
                let user = userData.find(u => u.user_id === rent.user_id);
                let game = user?.played_games.find(game => game.game.game_id === rent.game.game_id);
                return <RentReportTableData>{
                    expiration_date: rent.expiration_date,
                    game_id: rent.game.game_id,
                    playtime: game?.playtime,
                    price: rent.game.price,
                    progress: game?.progress,
                    user_id: rent.user_id,
                    start_date: rent.start_date,
                    username: user?.username,
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