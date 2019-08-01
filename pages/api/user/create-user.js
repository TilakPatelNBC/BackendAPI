import {insert} from '../../../services/mongo/mongoService'

export default (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    if (req && req.body){
        insert('Users', req.body);
        res.status(200).send({'inserted_user': req.body})
    } else {
        res.status(400).send({'error': 'no body found'})
    }
}
