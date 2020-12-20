import { createConnection, MysqlError } from "mysql";


let db = createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: Number.parseInt(process.env.MYSQL_PORT ?? "3306")
});

db.connect((err: MysqlError) => {
    if (err) throw err;
    console.log("Connected!");
});

export { db };