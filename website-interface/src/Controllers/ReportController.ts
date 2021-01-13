import { Request, Response } from "express";
import { ReportRequest } from "../Interfaces/ReportData";
import { LoginService } from "../Services/LoginService";
import { ReportApiService } from "../Services/ReportApiService";
import { createObjectCsvWriter } from "csv-writer";

const rentReportPath = __dirname + '/rent-report.csv';
const studioReportPath = __dirname + '/studio-report.csv';

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

    let from = new Date(data.start_date);
    let to = new Date(data.end_date);

    if (to.getTime() < from.getTime()) {
        res.status(400).send({ error: "end date of the report is before start date" });
        return
    }

    let reportData = await ReportApiService.getRentReport(data);

    const indays = 1000 * 60 * 60 * 24;
    reportData.forEach((entry) => {
        let start = new Date(entry.start_date);
        let end = new Date(entry.expiration_date);
        let diff = ((end.getTime() - start.getTime()) / indays) + 1;
        entry.price = entry.price * diff;
    });

    const csvWriter = createObjectCsvWriter({
        path: rentReportPath,
        header: [
            { id: "user_id", title: "User ID" },
            { id: "username", title: "Username" },
            { id: "title", title: "Game Title" },
            { id: "game_id", title: "Game ID" },
            { id: "price", title: "Price in €" },
            { id: "playtime", title: "Play Time in h" },
            { id: "progress", title: "Game Progess in %" },
            { id: "start_date", title: "Rent Start Date" },
            { id: "expiration_date", title: "Rent Expire Date" },
        ]
    });

    console.log("reportData:", reportData);

    try {
        await csvWriter.writeRecords(reportData);
    } catch (err) {
        console.error("error writing report to csv", err);
        res.status(500).send({ error: "Error writing the csv file" });
    }

    res.set({
        "Content-Disposition": "attachment;filename=report.csv"
    });

    res.status(200).sendFile(rentReportPath);
}

export async function createStudioReport(req: Request, res: Response) {
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

    let reportData = await ReportApiService.getStudioReport(data);
    const csvWriter = createObjectCsvWriter({
        path: studioReportPath,
        header: [
            { id: "user_id", title: "User ID" },
            { id: "username", title: "Username" },
            { id: "games_prices", title: "Price of Games in €" },
            { id: "number_of_games", title: "# of Games from Studio" },
            { id: "studio_id", title: "Studio ID" },
            { id: "name", title: "Studio" },
            { id: "price", title: "Studio price in €" }
        ]
    });

    console.log("reportData:", reportData);

    try {
        await csvWriter.writeRecords(reportData);
    } catch (err) {
        console.error("error writing report to csv", err);
    }

    res.set({
        "Content-Disposition": "attachment;filename=report.csv"
    });

    res.status(200).sendFile(studioReportPath);
}

