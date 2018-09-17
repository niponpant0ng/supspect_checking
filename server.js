const next = require("next")
const express = require("express")
const multer = require("multer")
const del = require("del")
const XLSX = require("xlsx")
const DotEnv = require('dotenv')
DotEnv.config()

const connect = require("./services/Connect")
const SupspectMapper = require("./services/SupspectMapper")
const SupsepctService = require("./services/SupspectService")

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
        const xlsxFile = req.file.destination + req.file.filename
        const workbook = XLSX.readFile(xlsxFile)
        const usageSheetName = workbook.SheetNames[0]
        var worksheet = workbook.Sheets[usageSheetName]

        let sheetRow = 0
        let supspect = {}
        let supspects = []

        for(const columnKey in worksheet) {
          const { col, row } = SupspectMapper.extractColAndRow(columnKey)
          if(parseInt(row) !== NaN && row >= 4) {
            if(!SupspectMapper.isRowVal(worksheet, row)) break

            if(sheetRow !== row) {
              sheetRow = row
              if(Object.keys(supspect).length !== 0) supspects.push(supspect)
              supspect = {}
            }

            const val = SupspectMapper.mapFieldAndVal(col, worksheet[`${col}${row}`].v)
            supspect = { ...supspect, ...val }
          }
        }
        supspects.push(supspect)

        try {
          await del(xlsxFile)
        } catch(err) {
          console.warn("Can't delete upload file")
        }

        const supsepctService = new SupsepctService(connect())
        supsepctService.save(supspects)

        res.redirect("/upload")
      } catch(err) {
        console.log(err)
        res.sendStatus(500).send("<a href='/'>Can't upload file</a>")
      }
    })

    server.get("/searchResults", async (req, res) => {
      const supsepctService = new SupsepctService(connect())
      try {
        const results = await supsepctService.find(req.query)
        res.send(JSON.stringify(results))
      } catch(err) {
        console.log(err)
        res.sendStatus(500).send("Can't search result")
      }
    })

    server
      .use(handle)
      .listen(3004)
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })