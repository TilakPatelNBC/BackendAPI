import axios from 'axios';

export default (req, res) => {
  res.setHeader('Content-Type', 'application/graphql')
  const api_endpoint = 'https://qa-aws01webql.cnbc.com/graphql'
  axios({
    method: 'post',
    url: api_endpoint,
    data: {
      query: data_string
    }
  })
    .then((response) => {
      res.status(response.status).json(response.data.data.page.layout[2].columns[0].modules[0]);
    })
    .catch((error) => {
      if (error.response) {
        res.status(error.response.status).json(error.response.data)
      } else {
        res.status(400).json({
          'error': 'an unknown server error occured'
        })
      }
    })
}

const data_string = `
{
  page(
   path:"/personal-finance/") {
   brand
   layout {
     columns {
       modules {
         data {
            ...on twoColumnImageDense {
    assets {
      description
      title
      headline
      shorterDescription
      url
      promoImage {
        url
      }
    }
  }
         }
       }
     }
   }
  }
  }
`