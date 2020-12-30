import { createConnection, MysqlError } from "mysql";
import { User } from "../Dtos/User";


let db = createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: Number.parseInt(process.env.MYSQL_PORT ?? "3306")
});

db.connect((err: MysqlError) => {
    if (err) throw err;
    console.log("Connected to database!");
});

export async function queryDb(query: string, values?: any): Promise<[any]> {
    return new Promise((resolve, reject) => db.connect(() => {
        let queryResult = db.query(query, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }));
}
export { db };