import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'

const url = 'mongodb+srv://tilak:Basketball23@cluster0-zp1hi.mongodb.net/test';
const default_mongo_db = 'main'
const client = new MongoClient(url)

export const insert = (collection, query) => {
    client.connect(function (err, res) {
        const db = client.db(default_mongo_db);
        if (query.password) {
            bcrypt.hash(query.password, 3, function(err, hash) {
                query.password = hash;
                db.collection(collection).insertOne(query, function(err, result){})
              });
        } else {
            db.collection(collection).insertOne(query, function(err, result){})
        }
    });
}

export const update = (collection, query, new_values) => {
    client.connect(function(error, res){
        const db = client.db(default_mongo_db)
        const update_query = { $set: new_values }
        db.collection(collection).updateOne(query, update_query, function(err, result){})
    })
}