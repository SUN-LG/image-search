const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImgSearchHisSchema = new Schema({
  term: String,
  when: String
})

const ImgSearchHis = mongoose.model('ImgSearchHis', ImgSearchHisSchema)

module.exports = ImgSearchHis;
