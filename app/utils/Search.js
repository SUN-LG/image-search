const fetch = require('node-fetch')
const apiUrl = 'https://api.cognitive.microsoft.com/bing/v5.0/search'
// const query =
class Search {
  constructor(SubscriptionKey) {
    this.SubscriptionKey= SubscriptionKey
  }

  image(keywordAndQuery, headers = {'Ocp-Apim-Subscription-Key': this.SubscriptionKey}) {
    console.log(apiUrl + keywordAndQuery + '&responseFilter=images');
    return fetch(apiUrl + keywordAndQuery + '&responseFilter=images', {headers})
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          console.log('status:', res.status)
        }
      })
      .catch(err => {
        console.log('fetch failed!', err)
      })
  }
}

module.exports = Search
