import { createConnection, MysqlError } from "mysql";


let db = createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: Number.parseInt(process.env.MYSQL_PORT ?? "3306")
});

let maxRetries = process.env.DB_CONNECT_RETRY ? parseInt(process.env.DB_CONNECT_RETRY) : 5;
let retryTimeout = process.env.DB_CONNECT_TIMEOUT ? parseInt(process.env.DB_CONNECT_TIMEOUT) : 500;

tryConnect();

async function tryConnect(retries: number = 1) {
    if (retries > maxRetries) {
        throw "Could not connect to Database.";
    }

    try {
        await connectDb();
        console.log("Connected to db!");
    }
    catch (err) {
        console.log("Error connecting to db, retrying", err);
        await setTimeout(async () => await tryConnect(++retries), retryTimeout);
    }
}

async function connectDb(): Promise<void> {
    new Promise<void>((resolve, reject) => db.connect((err: MysqlError) => {
        if (err) {
            reject(err);
        }
        else {
            resolve();
        }
    }));
}

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