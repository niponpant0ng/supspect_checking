module.exports = class SupspectMapper {
  static mapFieldAndVal(col, val) {
    return { [col]: val }
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