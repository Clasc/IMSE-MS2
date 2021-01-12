import { RentReportTableData } from "../Dtos/RentReportTableData";
import { ReportRequest } from "../Dtos/ReportRequest";
import { queryDb } from "../Services/db";

export async function createRentReport(reportData: ReportRequest): Promise<[RentReportTableData] | []> {

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