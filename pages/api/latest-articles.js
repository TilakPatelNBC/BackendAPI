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
      let data = response.data.data.page.layout[2].columns[0].modules[0]
      let new_art = {
        "author": [{
          "name": "Emmie Martin"
        }],
        "description": "Millennials agree on the best way to invest—but they’re wrong",
        "title": "Millennials agree on the best way to invest—but they’re wrong",
        "headline": "Millennials agree on the best way to invest—but they’re wrong",
        "shorterDescription": "Millennials agree on the best way to invest—but they’re wrong",
        "url": "https://www.cnbc.com/2019/07/18/millennials-say-real-estate-is-the-best-long-term-investment.html",
        "promoImage": {
          "url": "https://image.cnbcfm.com/api/v1/image/106016734-1562954147660gettyimages-1023293340.jpeg?v=1562954173&w=1400&h=950"
        }
      }

      data.data.assets.unshift(new_art)
      res.status(response.status).json(data);
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
      author{
        name
      }
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