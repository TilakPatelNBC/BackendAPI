import {insert} from '../../../services/mongo/mongoService'
import send from '../../../services/sendStatus'

export default (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    if (req && req.body){
        insert('users', req.body);
        send(res, 200, {'inserted_user': req.body})
    } else {
        send(res, 400, {'error': 'no body found'})
    }
}
