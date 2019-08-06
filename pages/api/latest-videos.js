import axios from 'axios'

export default (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const api_endpoint = 'https://www.googleapis.com/youtube/v3/search'
    const api_key = 'AIzaSyDLgcYIKMiMVM2HM3liPbzrJyJTnVUq1oY'
    const max_results = 10
    axios.get(api_endpoint, {
        params: {
            part: 'snippet',
            channelId: 'UCvJJ_dzjViJCoLf5uKUTwoA',
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