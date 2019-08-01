import send from '../../services/sendStatus'

export default (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    send(res, 200, 'connected')
}