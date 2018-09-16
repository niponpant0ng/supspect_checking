const chai = require("chai")
const should = chai.should()
const sinon = require("sinon")

const SupspectService = require("../../services/SupspectService")

const createSupspectDetail = () => ({
  "date": "2018/05/01",
  "time": "15:00",
  "police_area": "A",
  "requester": "John",
  "checking_area": "B",
  "result": "OK",
  "checking": "OK",
  "detail": "-",
})

describe("Supspect Service", () => {
  describe("mergeSupspects", () => {
    let supspectService
    before(function() {
      supspectService = new SupspectService(null)
    })
  
    after(function() {
      delete supspectService
    })

    it("should empty vehicle data but there are person detail when supspect type is 0 only", () => {
      const supspects = [{ ...createSupspectDetail(),
        "type": SupspectService.PERSON,
        "id_no": "1100800516789",
        "name": "John Doe",
      }]

      const mergeSupspects = supspectService.mergeSupspects(supspects)

      mergeSupspects.should.have.length(1)
      mergeSupspects[0].type.should.equal(SupspectService.PERSON)
      mergeSupspects[0].id_no.should.equal('1100800516789')
      mergeSupspects[0].name.should.equal('John Doe')
    })

    it("should vehicle data is motorcycle when supspect type is 1 only", () => {
      const supspects = [{ ...createSupspectDetail(),
        "type": SupspectService.MOTORCYCLE,
        "motorcycle_register": "23i492j",
        "motorcycle_owner": "John Doe",
        "color": "red",
        "brand": "Honda",
        "model": "CR-100",
      }]

      const mergeSupspects = supspectService.mergeSupspects(supspects)

      mergeSupspects.should.have.length(1)
      mergeSupspects[0].type.should.equal(SupspectService.MOTORCYCLE)
      mergeSupspects[0].plate_no.should.equal('23i492j')
      mergeSupspects[0].owner.should.equal('John Doe')
      mergeSupspects[0].color.should.equal('red')
      mergeSupspects[0].brand.should.equal('Honda')
      mergeSupspects[0].model.should.equal('CR-100')
      should.not.exist(mergeSupspects[0].motorcycle_register)
      should.not.exist(mergeSupspects[0].motorcycle_owner)
    })

    it("should vehicle data is car when supspect type is 1 only", () => {
      const supspects = [{ ...createSupspectDetail(),
        "type": SupspectService.CAR,
        "car_register": "23i492j",
        "car_owner": "John Doe",
        "color": "red",
        "brand": "Honda",
        "model": "Civic",
      }]

      const mergeSupspects = supspectService.mergeSupspects(supspects)

      mergeSupspects.should.have.length(1)
      mergeSupspects[0].type.should.equal(SupspectService.CAR)
      mergeSupspects[0].plate_no.should.equal('23i492j')
      mergeSupspects[0].owner.should.equal('John Doe')
      mergeSupspects[0].color.should.equal('red')
      mergeSupspects[0].brand.should.equal('Honda')
      mergeSupspects[0].model.should.equal('Civic')
    })

    it("should vehicle data is car when supspect type is 3 only", () => {
      const supspects = [{ ...createSupspectDetail(),
        "type": SupspectService.CAR_OWNER_NOT_SAME,
        "car_register": "23i492j",
        "car_owner": "John Doe",
        "color": "red",
        "brand": "Honda",
        "model": "Civic",
      }]

      const mergeSupspects = supspectService.mergeSupspects(supspects)

      mergeSupspects.should.have.length(1)
      mergeSupspects[0].type.should.equal(SupspectService.CAR_OWNER_NOT_SAME)
      mergeSupspects[0].plate_no.should.equal('23i492j')
      mergeSupspects[0].owner.should.equal('John Doe')
      mergeSupspects[0].color.should.equal('red')
      mergeSupspects[0].brand.should.equal('Honda')
      mergeSupspects[0].model.should.equal('Civic')
    })

    it("should both vehicle data and person detail are not empty when there are 2 supspect type", () => {
      const supspects = [{ ...createSupspectDetail(),
        "type": SupspectService.CAR,
        "car_register": "23i492j",
        "car_owner": "John Doe",
        "color": "red",
        "brand": "Honda",
        "model": "Civic",
      }, { ...createSupspectDetail(),
        "type": SupspectService.PERSON,
        "id_no": "1100800516789",
        "name": "John Doe",
      }]

      const mergeSupspects = supspectService.mergeSupspects(supspects)

      mergeSupspects.should.have.length(1)
      mergeSupspects[0].type.should.equal(SupspectService.CAR)
      mergeSupspects[0].plate_no.should.equal('23i492j')
      mergeSupspects[0].owner.should.equal('John Doe')
      mergeSupspects[0].color.should.equal('red')
      mergeSupspects[0].brand.should.equal('Honda')
      mergeSupspects[0].model.should.equal('Civic')
      mergeSupspects[0].id_no.should.equal('1100800516789')
      mergeSupspects[0].name.should.equal('John Doe')
    })

    it("should both person detail and vehicle data are not empty when there are 2 supspect type", () => {
      const supspects = [{ ...createSupspectDetail(),
        "type": SupspectService.PERSON,
        "id_no": "1100800516789",
        "name": "John Doe",
      }, { ...createSupspectDetail(),
        "type": SupspectService.CAR,
        "car_register": "23i492j",
        "car_owner": "John Doe",
        "color": "red",
        "brand": "Honda",
        "model": "Civic",
      }]

      const mergeSupspects = supspectService.mergeSupspects(supspects)

      mergeSupspects.should.have.length(1)
      mergeSupspects[0].type.should.equal(SupspectService.CAR)
      mergeSupspects[0].plate_no.should.equal('23i492j')
      mergeSupspects[0].owner.should.equal('John Doe')
      mergeSupspects[0].color.should.equal('red')
      mergeSupspects[0].brand.should.equal('Honda')
      mergeSupspects[0].model.should.equal('Civic')
      mergeSupspects[0].id_no.should.equal('1100800516789')
      mergeSupspects[0].name.should.equal('John Doe')
    })

    it("should there is 2 row for vehicle data and person detail and person detail only", () => {
      const supspects = [{ ...createSupspectDetail(),
        "type": SupspectService.CAR,
        "car_register": "23i492j",
        "car_owner": "John Doe",
        "color": "red",
        "brand": "Honda",
        "model": "Civic",
      }, { ...createSupspectDetail(),
        "type": SupspectService.PERSON,
        "id_no": "1100800516789",
        "name": "John Doe",
      }, { ...createSupspectDetail(),
        "type": SupspectService.CAR,
        "car_register": "czx23r2r23",
        "car_owner": "Foo Bar",
        "color": "blue",
        "brand": "Toyota",
        "model": "Yaris",
      }]

      const mergeSupspects = supspectService.mergeSupspects(supspects)

      mergeSupspects.should.have.length(2)
      mergeSupspects[0].type.should.equal(SupspectService.CAR)
      mergeSupspects[0].plate_no.should.equal('23i492j')
      mergeSupspects[0].owner.should.equal('John Doe')
      mergeSupspects[0].color.should.equal('red')
      mergeSupspects[0].brand.should.equal('Honda')
      mergeSupspects[0].model.should.equal('Civic')
      mergeSupspects[0].id_no.should.equal('1100800516789')
      mergeSupspects[0].name.should.equal('John Doe')

      mergeSupspects[1].type.should.equal(SupspectService.CAR)
      mergeSupspects[1].plate_no.should.equal('czx23r2r23')
      mergeSupspects[1].owner.should.equal('Foo Bar')
      mergeSupspects[1].color.should.equal('blue')
      mergeSupspects[1].brand.should.equal('Toyota')
      mergeSupspects[1].model.should.equal('Yaris')
      should.not.exist(mergeSupspects[1].id_no)
      should.not.exist(mergeSupspects[1].name)
    })
  })
})