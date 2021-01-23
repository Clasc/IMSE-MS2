import { RentReportTableData } from "../../Dtos/RentReportTableData";
import { ReportRequest } from "../../Dtos/ReportRequest";
import { StudioReportTableData } from "../../Dtos/StudioReportTableData";
import { queryDb } from "../../Services/db";
import { IReportRepo } from "./IReportRepo";

export class ReportRepo implements IReportRepo {
    async createRentReport(reportData: ReportRequest): Promise<[RentReportTableData] | []> {

        let result: [RentReportTableData] | [] = [];
        try {
            result = await queryDb(
                `SELECT User.user_id, User.username, Game.title, Game.game_id, Game.price, PlayedGame.playtime, PlayedGame.progress, Rent.start_date, Rent.expiration_date
            FROM User
            INNER JOIN Rent ON User.user_id = Rent.user_id
            INNER JOIN PlayedGame ON User.user_id = PlayedGame.user_id AND PlayedGame.game_id = Rent.game_id
            INNER JOIN Game On PlayedGame.game_id = Game.game_id 
            WHERE Rent.start_date >= '${reportData.start_date}' AND Rent.start_date < '${reportData.end_date}';`);
        } catch (err) {
            console.error("Error querying rent report data", err);
        }

        return result;
    }

    async createStudioReport(reportData: ReportRequest): Promise<[StudioReportTableData] | []> {

        let result: [StudioReportTableData] | [] = [];
        try {
            result = await queryDb(
                `SELECT User.user_id, User.username, SUM(Game.price) AS games_prices, Count(Game.game_id) AS number_of_games, Studio.studio_id, Studio.name, Studio.price
            FROM User 
            INNER JOIN Rent on User.user_id = Rent.user_id
            INNER JOIN Game on Rent.game_id = Game.game_id
            INNER JOIN Studio on Game.studio_id = Studio.studio_id
            WHERE Rent.start_date >= '${reportData.start_date}' AND Rent.start_date < '${reportData.end_date}'
            GROUP BY User.user_id, User.username, Studio.studio_id, Studio.name, Studio.price ;`);
        } catch (err) {
            console.error("Error querying studio report data", err);
        }

        return result;
    }
}