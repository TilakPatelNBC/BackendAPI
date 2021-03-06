import {update} from '../../../services/mongo/mongoService';
import send from '../../../services/sendStatus';

export default (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    if (req && req.body && req.body.user && req.body.update){
        update('users', req.body.user, req.body.update);
        send(res, 200, {'updated_user': req.body.update});
    } else {
        send(res, 400, {'error': 'no body found'});
    }
}
