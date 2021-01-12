import { RentReportTableData } from "../Dtos/RentReportTableData";
import { ReportRequest } from "../Dtos/ReportRequest";
import { queryDb } from "../Services/db";

export async function createRentReport(reportData: ReportRequest): Promise<[RentReportTableData] | []> {

    let result: [RentReportTableData] | [] = [];
    try {
        result = await queryDb(`SELECT User.user_id, User.username, Game.title, Game.game_id, Game.price, PlayedGame.playtime
    FROM User
    INNER JOIN Rent ON User.user_id = Rent.user_id
    INNER JOIN PlayedGame ON User.user_id = PlayedGame.user_id AND PlayedGame.game_id = Rent.game_id
    INNER JOIN Game On PlayedGame.game_id = Game.game_id;`);
    } catch {
        console.error("Error querying rent report data");
    }

    return result;
}