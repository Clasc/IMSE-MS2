import { RentReportTableData } from "../../Dtos/RentReportTableData";
import { ReportRequest } from "../../Dtos/ReportRequest";
import { StudioReportTableData } from "../../Dtos/StudioReportTableData";
import { IReportRepo } from "./IReportRepo";

export class ReportRepoMongo implements IReportRepo {
    createRentReport(reportData: ReportRequest): Promise<[RentReportTableData] | []> {
        throw new Error("Method not implemented.");
    }

    createStudioReport(reportData: ReportRequest): Promise<[StudioReportTableData] | []> {
        throw new Error("Method not implemented.");
    }
}