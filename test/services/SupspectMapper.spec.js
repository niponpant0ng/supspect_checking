const chai = require("chai")
const should = chai.should()
const sinon = require("sinon")

const SupspectMapper = require("../../services/SupspectMapper")

describe("Supspect Mapper", () => {
  describe("formatFieldValue", () => {
    it("should convert to date format when field name is date and seperate is -", () => {
      const fieldValue = SupspectMapper.formatFieldValue("date", "3-9-2018")

      fieldValue.should.equal("2018-09-03")
    })

    it("should convert to date format when field name is date and seperate is /", () => {
      const fieldValue = SupspectMapper.formatFieldValue("date", "3/9/2018")

      fieldValue.should.equal("2018-09-03")
    })

    it("should convert to type format when field name is type", () => {
      const fieldValue = SupspectMapper.formatFieldValue("type", "1")

      fieldValue.should.equal(1)
    })

    it("should still current value", () => {
      const fieldValue = SupspectMapper.formatFieldValue("brand", "Toyota")

      fieldValue.should.equal("Toyota")
    })
  })
})