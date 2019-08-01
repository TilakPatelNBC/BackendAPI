import bcrypt from 'bcrypt'
import envreader from '../../../services/envReader'
import {MongoClient} from 'mongodb'
import send from '../../../services/sendStatus'

const url = envreader.MONGO_URL;
const default_mongo_db = envreader.DEFAULT_MONGO_DB;
const client = new MongoClient(url)
const collection = 'Users'

export default (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    if (req && req.body && req.body.password) {
        client.connect(function (err, x) {
            const db = client.db(default_mongo_db);
            const password = req.body.password
            db.collection(collection).findOne(req.body, function (err, result) {
                console.log(result)
                if (result && !err){
                    bcrypt.compare(password, result.body.password, function(err, same) {
                        if (same) {
                            send(res, 200, {'message': 'authenticated'})
                        } else {
                            send(res, 400, {'message': 'wrong password!'})
                        }
                    });
                } else {
                    send(res, 400, {'message': 'user not found!'})
                }
            })
        });
    } else {
        send(res, 400, { 'error': 'no body found' })
    }
}