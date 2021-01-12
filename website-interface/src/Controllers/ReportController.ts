import { Request, Response } from "express";
import { ReportRequest } from "../Interfaces/ReportData";
import { LoginService } from "../Services/LoginService";
import { ReportApiService } from "../Services/ReportApiService";

export async function createRentReport(req: Request, res: Response) {
    console.log(req.body);
    let data = req.body as ReportRequest;
    if (!data.token || !data.username || !data.end_date || !data.start_date) {
        res.status(400).send({ success: false });
        return
    }

    if (! await LoginService.userIsAdmin(data)) {
        res.status(401).send({ success: false });
        return
    }

    let reportData = await ReportApiService.getRentReport(data);
    console.log("reportData:", reportData);
    res.status(200).send({ report: reportData });
}

export async function createSubscriptionReport(req: Request, res: Response) {
    console.log(req.body);
    let data = req.body as ReportRequest;
    if (!data.token || !data.username || !data.end_date || !data.start_date) {
        res.status(400).send({ success: false });
        return
    }

    if (! await LoginService.userIsAdmin(data)) {
        res.status(401).send({ success: false });
        return
    }

    res.status(200).send({ success: true });
}

