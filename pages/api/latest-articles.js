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
            res.status(response.status).json(response.data["data"]["page"]["layout"][3]["columns"][0]["modules"][0]);
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
     path:"/us-top-news-and-analysis/") {
     brand
     layout {
       columns {
         span
         modules {
           name
           source
           attributes
          serverRenderPolicy
           data {
              ...on heroLedePlusThree {
      id
      assets {
        id
        type
        premium
        description
        brand
        title
        headline
        shorterDescription
        section {
          eyebrow
          url
        }
        url
        promoImage {
          id
          url
        }
        premium
        dateLastPublishedSixHr
      }
    }
             ...on articleHeader{
               author{
                 name
               }
               sourceOrganization{
                 name
               }
               datePublished
     dateModified
     dateLastPublished
     dateFirstPublished
     datePublishedFormatted
     dateLastPublishedFormatted
             }
             ... on articleBody {
               id
               type
               brand
               premium
               section {
                 id
                 color
               }
               native
               creatorOverwrite
               sourceOrganization {
                 id
                 url
                 name
                 logo
                 creatorOverwrite
                 linkHeadline
               }
               body {
                 content {
                   tagName
                   attributes
                   children
                 }
               }
               shortestHeadline
               featuredMedia {
                 id
                 ... on image {
                   caption
                   copyrightHolder
                   isHighTouch
                 }
               }
             }
             ... on featuredBreaker {
               url
               type
               title: eyebrow
               subType
               sectionLabel
               showTime
               logo {
                 url
               }
               shorterHeadline
               assets(count: 8, promoted: true) {
                 ... on event {
                   startDate
                   location
                 }
                 id
                 brand
                 type
                 native
                 url
                 datePublished
                 title
                 linkHeadline
                 shorterHeadline
                 slug
                 subType
                 section {
                   subType
                 }
                 sectionHierarchy {
                   tagName
                 }
                 promoImage {
                   id
                   url
                 }
                 author {
                   name
                 }
                 sourceOrganization {
                   name
                 }
                 creatorOverwrite
               }
             }
           }
         }
       }
     }
    }
    }
`