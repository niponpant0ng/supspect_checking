import React from "react"
import axios from "axios"

const VEHICLE_COLOR_STYLE = { background: "#8EAADB" }
const VEHICLE_BRAND_STYLE = { background: "#FFD964" }
const VEHICLE_SERIE_STYLE = { background: "#A9CD90" }

export default class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      filter: {
        dateFrom: "",
        dateTo: "",
        timeFrom: "",
        timeTo: "",
        plateNo: "",
        idNo: "",
        name: "",
        color: "",
        brand: "",
        serie: "",
        area: "",
      },
    }

    this.onSearchClicked = this.onSearchClicked.bind(this)
    this.onFilterChanged = this.onFilterChanged.bind(this)
  }

  async onSearchClicked() {
    const param = Object.entries(this.state.filter).map(([key, val]) => `${key}=${val}`).join('&')
    const { data } = await axios.get(`/searchResults?${param}`)

    this.setState({ results: data })
  }

  onFilterChanged(filterType, e) {
    const value = e.target.value
    const filter = { ...this.state.filter, [filterType]: value }

    this.setState({ filter })
  }

  render() {
    const { dateFrom, dateTo, timeFrom, timeTo, plateNo, idNo, name, color, brand, serie, area } = this.state.filter
    const rows = this.state.results.map((result, index) => (
      <tr key={ index }>
        <td>{ result.date }</td>
        <td>{ result.time }</td>
        <td>{ result.police_area }</td>
        <td>{ result.requester }</td>
        <td>{ result.checking_area }</td>
        <td>{ result.id_no }</td>
        <td>{ result.name }</td>
        <td>{ result.type }</td>
        <td>{ result.plate_no }</td>
        <td>{ result.owner }</td>
        <td style={ VEHICLE_COLOR_STYLE }>{ result.color }</td>
        <td style={ VEHICLE_BRAND_STYLE }>{ result.brand }</td>
        <td style={ VEHICLE_SERIE_STYLE }>{ result.model }</td>
        <td>{ result.result }</td>
        <td>{ result.checking }</td>
        <td>{ result.detail }</td>
      </tr>
    ))

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 form-group">
            <div>วันที่</div>
            <input value={ dateFrom } onChange={ this.onFilterChanged.bind(null, 'dateFrom') } placeholder="dd/mm/yyyy"
              style={{ marginRight: 5, width: 110 }}/>
            -
            <input value={ dateTo } onChange={ this.onFilterChanged.bind(null, 'dateTo') } placeholder="dd/mm/yyyy"
              style={{ marginLeft: 5, width: 110 }}/>
          </div>

          <div className="col-3 form-group">
            <div>เวลา</div>
            <input value={ timeFrom } onChange={ this.onFilterChanged.bind(null, 'timeFrom') } placeholder="hh.mm"
              style={{ marginRight: 5, width: 70 }}/>
            -
            <input value={ timeTo } onChange={ this.onFilterChanged.bind(null, 'timeTo') } placeholder="hh.mm"
              style={{ marginLeft: 5, width: 70 }}/>
          </div>

          <div className="col-3 form-group">
            <div>หมายเลขบัตรประชาชน</div>
            <input value={ idNo } onChange={ this.onFilterChanged.bind(null, 'idNo') }/>
          </div>

          <div className="col-3 form-group">
            <div>ชื่อ - สกุล(ผู้ครอบครอง, ชื่อบุคคล)</div>
            <input value={ name } onChange={ this.onFilterChanged.bind(null, 'name') }/>
          </div>
        </div>

        <div className="row">
          <div className="col-3 form-group">
            <div>ทะเบียนรถ</div>
            <input value={ plateNo } onChange={ this.onFilterChanged.bind(null, 'plateNo') }/>
          </div>

          <div className="col-3 form-group">
            <div>สี</div>
            <input value={ color } onChange={ this.onFilterChanged.bind(null, 'color') }/>
          </div>

          <div className="col-3 form-group">
            <div>ยี่ห้อ</div>
            <input value={ brand } onChange={ this.onFilterChanged.bind(null, 'brand') }/>
          </div>

          <div className="col-3 form-group">
            <div>รุ่น</div>
            <input value={ serie } onChange={ this.onFilterChanged.bind(null, 'serie') }/>
          </div>
        </div>

        <div className="row">
          <div className="col-3 form-group">
            <div>จุดตรวจ</div>
            <input value={ area } onChange={ this.onFilterChanged.bind(null, 'area') }/>
          </div>

          <div className="col-4 form-group">
            <button className="btn btn-primary" onClick={ this.onSearchClicked } style={{ marginTop: 15 }}>ค้นหา</button>
          </div>
        </div>

        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped" style={{ width: "auto", fontSize: "12px" }}>
              <thead className="thead-light">
                <tr>
                  <th scope="col" rowSpan="2" style={{ width: 100 }}>วันที่</th>
                  <th scope="col" rowSpan="2">เวลา</th>
                  <th scope="col" rowSpan="2" style={{ width: 120 }}>สภ</th>
                  <th scope="col" rowSpan="2" style={{ width: 120 }}>ผู้ขอข้อมูล</th>
                  <th scope="col" rowSpan="2" style={{ width: 100 }}>จุดตรวจ</th>
                  <th scope="col" rowSpan="2">หมายเลข 13 หลัก</th>
                  <th scope="col" rowSpan="2" style={{ width: 120 }}>บุคคล(ชื่อ/สกุล)</th>
                  <th scope="col" rowSpan="2" style={{ width: 80 }}>ประเภท</th>
                  <th scope="col" colSpan="2" style={{ width: 220 }}>ยานพาหนะ</th>
                  <th scope="col" rowSpan="2" style={ VEHICLE_COLOR_STYLE }>สี</th>
                  <th scope="col" rowSpan="2" style={ VEHICLE_BRAND_STYLE }>ยี่ห้อ</th>
                  <th scope="col" rowSpan="2" style={ VEHICLE_SERIE_STYLE }>รุ่น</th>
                  <th scope="col" rowSpan="2">ผลการตรวจ</th>
                  <th scope="col" rowSpan="2">ภ.จว.ที่ขอตรวจ</th>
                  <th scope="col" rowSpan="2">ข้อมูลที่สมบูรณ์</th>
                </tr>
                <tr>
                  <th scope="col">เลขทะเบียน</th>
                  <th scope="col">ผู้ครอบครอง</th>
                </tr>
              </thead>
              <tbody>
                { rows }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}