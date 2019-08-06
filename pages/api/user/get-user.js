import { MongoClient } from 'mongodb'
import send from '../../../services/sendStatus'

const url = 'mongodb+srv://tilak:Basketball23@cluster0-zp1hi.mongodb.net/test';
const default_mongo_db = 'main'
const client = new MongoClient(url)
const collection = 'users'

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
