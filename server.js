const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/people/:slug', (req, res) => {
      const personPage = '/person'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, personPage, queryParams)
    })

    server.get('/blog/:slug', (req, res) => {
      const postPage = '/post'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, postPage, queryParams)
    })

    server.get('/portfolio/:slug', (req, res) => {
      const actualPage = '/project'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/portfolio/photo-project/:slug', (req, res) => {
      const photoPage = '/photoproject'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, photoPage, queryParams)
    })

    server.get('/portfolio/video-project/:slug', (req, res) => {
      const photoPage = '/videoproject'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, photoPage, queryParams)
    })
    
    server.get('/portfolio/design-project/:slug', (req, res) => {
      const photoPage = '/designproject'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, photoPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })