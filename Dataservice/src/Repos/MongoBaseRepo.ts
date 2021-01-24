import { mongoDB } from "../Services/mongodb";

export class MongoBaseRepo {
    async increment(field: { collecition: string, idField: string }) {
        let values = await mongoDB.collection(field.collecition).find().sort({ idField: -1 }).limit(1).toArray();

        if (!values[0] || !values[0][field.idField] || values[0][field.idField] == 0) {
            return 0;
        }

        return values[0][field.idField] + 1;
    }
}