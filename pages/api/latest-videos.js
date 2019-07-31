import axios from 'axios'
import {config} from 'dotenv'
config()

export default (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const api_endpoint = process.env.YOUTUBE_API_ENDPOINT
    const api_key = process.env.YOUTUBE_API_KEY
    const max_results = req.body.max_results
    axios.get(api_endpoint, {
        params: {
            part: 'snippet',
            channelId: process.env.CNBC_YOUTUBE_CHANNEL_ID,
            maxResults: max_results || 10,
            order: 'date',
            key: api_key
        }
    })
        .then((response) => res.status(response.status).json(response.data))
        .catch((error) => {
            if (error.response){
                res.status(error.response.status).json(error.response.data)
            } else {
                res.status(400).json({
                    'error': 'an unknown server error occured'
                })
            }
        })
    
}