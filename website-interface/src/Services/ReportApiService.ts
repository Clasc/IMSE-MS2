import axios from "axios";
import { RentReportData } from "../Dtos/RentReportData";
import { SubsReportTableData } from "../Dtos/SubsReportTableData";
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

    public static async getSubsReport(reportRequest: ReportRequest): Promise<[SubsReportTableData] | []> {
        console.log(reportRequest);
        let subsReport: [SubsReportTableData] | [] = [];
        try {
            subsReport = (await axios
                .post(`${RestApi}/reports/subscription`, JSON.stringify(reportRequest), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })).data;
        }
        catch {
            console.log("unable to generate Report about subscriptions!");
        };

        console.log("subscription Report generated!");
        return subsReport;
    }

}