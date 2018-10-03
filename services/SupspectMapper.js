const FILE_COLUMN_TO_DB_FIELD = {
  "A": "date",
  "B": "time",
  "C": "police_area",
  "D": "requester",
  "E": "checking_area",
  "F": "car_register",
  "G": "car_owner",
  "H": "motorcycle_register",
  "I": "motorcycle_owner",
  "J": "color",
  "K": "brand",
  "L": "model",
  "M": "type",
  "N": "id_no",
  "O": "name",
  "P": "result",
  "Q": "checking",
  "R": "detail",
}

module.exports = class SupspectMapper {
  static mapFieldAndVal(col, val) {
    const fieldName = FILE_COLUMN_TO_DB_FIELD[col]
    const fieldVal = SupspectMapper.formatFieldValue(fieldName, val)

    return fieldVal === ""? {}: { [fieldName]: fieldVal }
  }

  static formatFieldValue(fieldName, val) {
    if(fieldName === FILE_COLUMN_TO_DB_FIELD["A"]) {
      return SupspectMapper.formatDate(val)
    } else if(fieldName === FILE_COLUMN_TO_DB_FIELD["M"]) {
      return parseInt(val)
    }

    return val.toString().trim()
  }

  static formatDate(val) {
    const formatDayOrMonth = (val) => val.length === 1? `0${val}`: val

    let seperate = (val.search("/") === -1)? "-": "/"
    const [date, month, year] = val.split(seperate)

    return `${year}-${formatDayOrMonth(month)}-${formatDayOrMonth(date)}`
  }

  static isRowVal(worksheet, row) {
    let isVal

    try {
      isVal = worksheet[`A${row}`].v !== ""
    } catch(err) {
      isVal = false
    }

    return isVal
  }

  static extractColAndRow(columnKey) {
    return {
      col: columnKey.substring(0, 1),
      row: columnKey.substring(1, columnKey.length)
    }
  }
}