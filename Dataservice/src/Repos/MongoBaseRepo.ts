import { mongoDB } from "../Services/mongodb";

export class MongoBaseRepo {
    async increment(field: { collecition: string, idField: string }) {
        let sortFunction: any = {};
        sortFunction[field.idField] = -1;
        let values = await mongoDB.collection(field.collecition).find().sort(sortFunction).limit(1).toArray();
        console.log("max values:", values)
        if (!values[0] || !values[0][field.idField] || values[0][field.idField] == 0) {
            return 0;
        }

        return values[0][field.idField] + 1;
    }
}