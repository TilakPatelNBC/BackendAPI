import { MongoClient } from 'mongodb'
import envreader from '../envReader'

const url = envreader.MONGO_URL;
const default_mongo_db = envreader.DEFAULT_MONGO_DB;
const client = new MongoClient(url)

export const insert = (collection, query) => {
    client.connect(function (err, res) {
        const db = client.db(default_mongo_db);
        db.collection(collection).insertOne(query, function(err, result){})
    });
}

export const update = (collection, query, new_values) => {
    client.connect(function(error, res){
        const db = client.db(default_mongo_db)
        const update_query = { $set: new_values }
        db.collection(collection).updateOne(query, update_query, function(err, result){})
    })
}