import envreader from '../../services/env-reader'
import {MongoClient} from 'mongodb'

export default (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    const dbName = 'main';
    const url = 'mongodb://localhost:27017';

    const client = new MongoClient(url);
    
    res.status(200).send('sdf')
}








