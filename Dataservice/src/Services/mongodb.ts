import { Db, MongoClient, MongoError } from "mongodb";

export let mongoDB: Db;

export function connectToMongoDB(): void {
    let url = `mongodb://${process.env.MONGO_HOST_IP}:${process.env.MONGO_PORT}/`;
    MongoClient.connect(url, {
        auth: {
            user: process.env.MONGO_USER as string, password: process.env.MONGO_PASSWORD as string
        }
    },
        (err: MongoError, db: MongoClient) => {
            if (err) {
                throw (err);
            }
            else {
                mongoDB = db.db(process.env.MONGO_DB);
                console.log("Connected to MongoDB!");
            }
        });
}
