const next = require("next")
const express = require("express")
const multer = require("multer")
const del = require("del")

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const upload = multer({ dest: `tmp/` })

const routes = require('./routes')
const handle = routes.getRequestHandler(app)

app.prepare()
  .then(() => {
    const server = express()

    server.post("/upload", upload.single('file'), async (req, res) => {
      try {
        res.send("Upload Complete")
      } catch(err) {
        res.sendStatus(500)
      }
    })

    server
      .use(handle)
      .listen(3003)
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })