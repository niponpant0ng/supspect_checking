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
    let query = ""
    let queryVal = []

    if(filter['dateFrom'] !== "") {
      query += " AND date >= ?"
      queryVal.push(filter['dateFrom'])
    }

    if(filter['dateTo'] !== "") {
      query += " AND date <= ?"
      queryVal.push(filter['dateTo'])
    }

    if(filter['timeFrom'] !== "") {
      query += " AND time >= ?"
      queryVal.push(filter['timeFrom'])
    }

    if(filter['timeTo'] !== "") {
      query += " AND time <= ?"
      queryVal.push(filter['timeTo'])
    }

    if(filter['plateNo'] !== "") {
      query += " AND (motorcycle_register LIKE ? OR car_register LIKE ?)"
      queryVal.push(`%${filter['plateNo']}%`, `%${filter['plateNo']}%`)
    }

    if(filter['idNo'] !== "") {
      query += " AND id_no LIKE ?"
      queryVal.push(`%${filter['idNo']}%`)
    }

    return new Promise((resolve, reject) => {
      this.connect.connect()

      this.connect.query(`SELECT * FROM results WHERE 1 = 1${query}`, queryVal, (err, res) => {
        if(err) reject(err)
        resolve(res)
      })

      this.connect.end()
    })
  }
}