import { MongoClient } from 'mongodb'
import envreader from '../../../services/envReader'
import send from '../../../services/sendStatus'

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
                if (err || !result) {
                    send(res, 400, {'error': 'not found'})
                } else {
                    delete result.password
                    send(res, 200, result)
                }
            })
        });
    } else {
        send(res, 400, {'error': 'no body found'})
    }
}
