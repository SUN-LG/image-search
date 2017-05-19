module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Image Search Server')
  })

  app.use('/api', require('./api'))
  app.use((req, res) => {
    if (!req.headersSent) res.status(404).send('404 Not Found')
  })
}
