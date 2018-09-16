class SupsepctService {
  constructor(connect) {
    this.connect = connect
  }

  mergeSupspects(supspects) {
    let types = []
    let mergeSupspect = {}
    let mergeSupspects = []

    for(const supspect of supspects) {
      if(this.isNotTypeChanged(supspect, types)) {
        types.push(supspect.type)
      } else {
        types = [supspect.type]
        mergeSupspects.push({ ...mergeSupspect })
        mergeSupspect = {}
      }

      if(supspect.type === SupsepctService.MOTORCYCLE) {
        const { motorcycle_register, motorcycle_owner, ...exSupspect } = this.excludeMotorCycleAndPerson(supspect)
        mergeSupspect = {
          ...mergeSupspect,
          ...exSupspect,
          plate_no: motorcycle_register,
          owner: motorcycle_owner
        }
      } else if(supspect.type === SupsepctService.CAR || supspect.type === SupsepctService.CAR_OWNER_NOT_SAME) {
        const { car_register, car_owner, ...exSupspect } = this.excludeCarAndPerson(supspect)
        mergeSupspect = {
          ...mergeSupspect,
          ...exSupspect,
          plate_no: car_register,
          owner: car_owner
        }
      } else {
        mergeSupspect = { ...mergeSupspect, ...this.excludeTypeIfExist(mergeSupspect, supspect) }
      }
    }
    mergeSupspects.push(mergeSupspect)

    return mergeSupspects
  }

  save(supspects) {
    this.connect.connect()

    this.mergeSupspects(supspects).forEach(supspect => {
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

        resolve(
          res.map(_res => {
            const [year, month, day] = _res.date.split("-")
            return { ..._res, date: `${day}/${month}/${year}`, type: this.convertTypeToText(_res.type) }
          })
        )
      })

      this.connect.end()
    })
  }

  isNotTypeChanged(supspect, types) {
    return types.length === 0 || !types.some(type => type === supspect.type)
  }
  
  excludeCarAndPerson(supspect) {
    const { car_register, car_owner, name, id_no, ...exSupspect } = supspect
    return { car_register, car_owner, ...exSupspect }
  }
  
  excludeMotorCycleAndPerson(supspect) {
    const { motorcycle_register, motorcycle_owner, name, id_no, ...exSupspect } = supspect
    return { motorcycle_register, motorcycle_owner, ...exSupspect }
  }
  
  excludeTypeIfExist(mergeSupspect, supspect) {
    if(mergeSupspect.type === undefined) {
      return { ...supspect }
    } else {
      const { type, ...exSupspect } = supspect
      return { ...exSupspect }
    }
  }

  convertTypeToText(type) {
    switch(parseInt(type)) {
      case SupsepctService.MOTORCYCLE:
        return "จักรยานยนต์"

      case SupsepctService.CAR:
      case SupsepctService.CAR_OWNER_NOT_SAME:
        return "รถยนต์"

      default:
        return ""
    }
  }
}

SupsepctService.PERSON = 0
SupsepctService.MOTORCYCLE = 1
SupsepctService.CAR = 2
SupsepctService.CAR_OWNER_NOT_SAME = 3

module.exports = SupsepctService