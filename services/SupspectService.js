module.exports = class SupsepctService {
  constructor(connect) {
    this.connect = connect
  }

  save(supspects) {
    this.connect.connect()

    supspects.forEach(supspect => {
      this.connect.query('INSERT INTO results SET ?', supspect, null)
    })

    this.connect.end()
  }

  find(filter) {
    return new Promise((resolve, rej) => {
      this.connect.connect()

      this.connect.query("SELECT * FROM results", (err, res) => {
        resolve(res)
      })

      this.connect.end()
    })
  }
}