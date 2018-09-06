const next = require("next")
const express = require("express")

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const routes = require('./routes')
const handle = routes.getRequestHandler(app)

app.prepare()
  .then(() => {
    express()
      .use(handle)
      .listen(3003)
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })