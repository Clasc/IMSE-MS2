import { RentReportTableData } from "../../Dtos/RentReportTableData";
import { ReportRequest } from "../../Dtos/ReportRequest";
import { StudioReportTableData } from "../../Dtos/StudioReportTableData";
import { USE_MONGO_DB } from "../../USE_MONGO_DB";
import { ReportRepo } from "./ReportRepo";
import { ReportRepoMongo } from "./ReportRepoMongo";

export interface IReportRepo {
    createRentReport(reportData: ReportRequest): Promise<[RentReportTableData] | []>;
    createStudioReport(reportData: ReportRequest): Promise<[StudioReportTableData] | []>;
}

export function createReportRepo(): IReportRepo {
    return USE_MONGO_DB ? new ReportRepoMongo() : new ReportRepo();
}