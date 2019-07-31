import axios from 'axios'
import envreader from '../../services/env-reader'

export default (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const api_endpoint = envreader.YOUTUBE_API_ENDPOINT
    const api_key = envreader.YOUTUBE_API_KEY
    const max_results = envreader.max_results
    axios.get(api_endpoint, {
        params: {
            part: 'snippet',
            channelId: envreader.CNBC_YOUTUBE_CHANNEL_ID,
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