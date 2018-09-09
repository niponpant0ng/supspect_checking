import React from "react"
import axios from "axios"
import Layout from "../components/Layout"

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
    const { dateFrom, dateTo, timeFrom, timeTo, plateNo, idNo } = this.state.filter
    const rows = this.state.results.map((result, index) => (
      <tr key={ index }>
        <td>{ result.date }</td>
        <td>{ result.time }</td>
        <td>{ result.police_area }</td>
        <td>{ result.requester }</td>
        <td>{ result.checking_area }</td>
        <td>{ result.car_register }</td>
        <td>{ result.car_owner }</td>
        <td>{ result.motorcycle_register }</td>
        <td>{ result.motorcycle_owner }</td>
        <td>{ result.color }</td>
        <td>{ result.brand }</td>
        <td>{ result.model }</td>
        <td>{ result.type }</td>
        <td>{ result.id_no }</td>
        <td>{ result.name }</td>
        <td>{ result.result }</td>
        <td>{ result.checking }</td>
        <td>{ result.detail }</td>
      </tr>
    ))

    return (
      <Layout>
        วันที่จาก: <input value={ dateFrom } onChange={ this.onFilterChanged.bind(null, 'dateFrom') }/>
        วันที่ถึง: <input value={ dateTo } onChange={ this.onFilterChanged.bind(null, 'dateTo') }/>
        เวลาจาก: <input value={ timeFrom } onChange={ this.onFilterChanged.bind(null, 'timeFrom') }/>
        เวลาถึง: <input value={ timeTo } onChange={ this.onFilterChanged.bind(null, 'timeTo') }/>
        ทะเบียนรถ: <input value={ plateNo } onChange={ this.onFilterChanged.bind(null, 'plateNo') }/>
        หมายเลขบัตรประชาชน: <input value={ idNo } onChange={ this.onFilterChanged.bind(null, 'idNo') }/>
        <p><button onClick={ this.onSearchClicked }>ค้นหา</button></p>

        <table border="1" cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <td>date</td>
              <td>time</td>
              <td>police_area</td>
              <td>requester</td>
              <td>checking_area</td>
              <td>car_register</td>
              <td>car_owner</td>
              <td>motorcycle_register</td>
              <td>motorcycle_owner</td>
              <td>color</td>
              <td>brand</td>
              <td>model</td>
              <td>type</td>
              <td>id_no</td>
              <td>name</td>
              <td>result</td>
              <td>checking</td>
              <td>detail</td>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </Layout>
    )
  }
}