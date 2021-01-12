import { LoginData } from "./LoginData";

export interface ReportRequest extends LoginData {
    start_date: string;
    end_date: string;
}