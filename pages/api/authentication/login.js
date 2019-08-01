import bcrypt from 'bcrypt'
import envreader from '../../../services/envReader'
import {MongoClient} from 'mongodb'

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
            delete req.body.password
            db.collection(collection).findOne(req.body, function (err, result) {
                bcrypt.compare(password, result.password, function(err, same) {
                    if (same) {
                        res.status(200).send({'message': 'authenticated!'})
                    } else {
                        res.status(400).send({'message': 'wrong password!'})
                    }
                });
            })
        });
    } else {
        res.status(400).send({ 'error': 'no body found' })
    }
}