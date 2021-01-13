import axios from "axios";
import { RentReportData } from "../Dtos/RentReportData";
import { StudioReportTableData } from "../Dtos/StudioReportTableData";
import { ReportRequest } from "../Interfaces/ReportData";
import { RestApi } from "../RestApi";

export class ReportApiService {
    public static async getRentReport(reportRequest: ReportRequest): Promise<[RentReportData] | []> {
        console.log(reportRequest);
        let rentReport: [RentReportData] | [] = [];
        try {
            rentReport = (await axios
                .post(`${RestApi}/reports/rent`, JSON.stringify(reportRequest), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })).data;
        }
        catch {
            console.log("unable to generate Report about rents!");
        };

        console.log("rent Report generated!");
        return rentReport;
    }

    public static async getStudioReport(reportRequest: ReportRequest): Promise<[StudioReportTableData] | []> {
        console.log(reportRequest);
        let studioReport: [StudioReportTableData] | [] = [];
        try {
            studioReport = (await axios
                .post(`${RestApi}/reports/studio`, JSON.stringify(reportRequest), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })).data;
        }
        catch {
            console.log("unable to generate Report about studios!");
        };

        console.log("studio Report generated!");
        return studioReport;
    }

}