const express = require('express')
const router = express.Router()
const Search = require('../utils/Search')
const SubscriptionKey = process.env.SubscriptionKey
const ImgSearchHis = require('../models/ImgSearchHistory')

router.get('/imagesearch/:keyword', (req, res) => {
  const keyword = req.params.keyword
  const originalUrl = req.originalUrl
  const queryString = originalUrl.includes('?') ? '&' + originalUrl.split('?')[1] : ''
  const keywordAndQuery = `?q=${keyword}${queryString}`
  const search = new Search(SubscriptionKey)

  ImgSearchHis.create({
    term: keyword,
    when: (new Date()).toISOString()
  })
  search.image(keywordAndQuery)
    .then(json => {
      const images = json.images.value.map(imgObj => {
        return {
          url: imgObj.contentUrl,
          snippet: imgObj.name,
          thumbnail: imgObj.thumbnailUrl,
          context: imgObj.hostPageUrl
        }
      })

      res.json(images)
    })
})

router.get('/latest/imagesearch/', (req, res) => {
  const result = ImgSearchHis.find()
    .limit(20)
    .select({term: 1, when: 1, _id: 0})
    .sort('-when')
    .exec((err, histories) => {
      if (err) throw err
      res.json(histories)
    })
})

module.exports = router;
