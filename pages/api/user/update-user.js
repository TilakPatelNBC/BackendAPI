import {update} from '../../../services/mongo/mongoService'

export default (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    if (req && req.body && req.body.user && req.body.update){
        update('Users', req.body.user, req.body.update);
        res.status(200).send({'updated_user': req.body.update})
    } else {
        res.status(400).send({'error': 'no body found'})
    }
}
