const next = require("next")
const express = require("express")
const multer = require("multer")
const del = require("del")
const XLSX = require("xlsx")

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const upload = multer({ dest: `tmp/` })

const routes = require('./routes')
const handle = routes.getRequestHandler(app)

const extractColAndRow = (columnKey) => ({col: columnKey.substring(0, 1), row: columnKey.substring(1, columnKey.length)})

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
        let isVal = false

        Object.keys(worksheet).map( columnKey => {
          const { col, row } = extractColAndRow(columnKey)

          if(parseInt(row) !== NaN && row >= 4) {
            if(sheetRow !== row) {
              try {
                isVal = worksheet[`A${row}`].v !== ""
              } catch(err) {
                isVal = false
              }
            }

            if(isVal) {
              console.log(col)
              console.log(row)
              console.log(worksheet[columnKey].v)
              console.log(" ----- ")
            }
          }
        })

        res.send("Upload Complete")
      } catch(err) {
        console.log(err)
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