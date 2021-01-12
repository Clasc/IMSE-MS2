import { Request, Response } from "express";
import { ReportRequest } from "../Dtos/ReportRequest";
import { createRentReport } from "../Repos/ReportRepo";
export async function getRentReport(req: Request, res: Response) {
    let reportRequest = req.body as ReportRequest;

    if (!reportRequest.start_date || !reportRequest.end_date) {
        res.status(400).send("invalid request body");
    }

    let reportTableData = await createRentReport(reportRequest);

    res.status(!reportTableData ? 500 : 200).send(reportTableData);
}

export async function getSubsReport(req: Request, res: Response) {
    let reportRequest = req.body as ReportRequest;

    if (!reportRequest.start_date || !reportRequest.end_date) {
        res.status(400).send("invalid request body");
    }

    let reportTableData = await createRentReport(reportRequest);

    res.status(!reportTableData ? 500 : 200).send(reportTableData);
}