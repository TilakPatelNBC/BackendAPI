import { MongoClient } from 'mongodb'
import envreader from '../../../services/envReader'

const url = envreader.MONGO_URL;
const default_mongo_db = envreader.DEFAULT_MONGO_DB;
const client = new MongoClient(url)
const collection = 'Users'

export default (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    if (req && req.body) {
        client.connect(function (err, x) {
            const db = client.db(default_mongo_db);
            db.collection(collection).findOne(req.body, function (err, result) {
                if (err) {
                    res.status(400).send({ 'error': 'not found' })
                } else {
                    delete result.password
                    res.status(200).send(result)
                }
            })
        });
    } else {
        res.status(400).send({ 'error': 'no body found' })
    }
}
