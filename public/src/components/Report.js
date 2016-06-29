import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/ActionReport'
import { getAnggarans } from '../actions/ActionAnggaran'
import { toRp } from '../utils/index'
import { Link, browserHistory } from 'react-router'
import $ from 'jquery'
import TopBar from '../views/TopBar'
import moment from 'moment'

actionCreators.getAnggarans = getAnggarans


let firstTime = true
let upgraded = false
class Report extends React.Component {
  constructor(props) {
    super(props)
  }


  componentWillMount() {
    this.props.actions.getAnggarans()
  }


  handleEdit(id, cetak) {
    browserHistory.push(`report/edit/${id}/${cetak}`)
  }

  componentDidUpdate() {
    const _this = this
    $('table').on('change','td .mdl-checkbox__input',function(){
      var checked = []
      $('td .mdl-checkbox__input').each(function(i, k){
        this.checked && checked.push(_this.props.report.data[i])
      });
      _this.props.actions.selectReports(checked)
    })

    if (this.props.anggaran && this.props.anggaran.data.length > 0 && firstTime) {
      const anggaran = this.props.anggaran.data
      console.log(anggaran)
      this.props.actions.getReports(anggaran[0].ID)
      firstTime = false
      setTimeout(function() {
        $('.anggaran-input').addClass('is-dirty')
      }, 200)
    } else {
      setTimeout(function() {
        $('.anggaran-input').addClass('is-dirty')
      }, 200)
      componentHandler.upgradeDom();
    }
  }

  componentDidMount() {
    if (!upgraded) {
      componentHandler.upgradeDom();
      upgraded = true
    }
  }

  handleAnggaranChange(e) {
    console.log(e.target.value)
    this.props.actions.getReports(e.target.value)
  }

  isFetching() {
    return 'mdl-progress mdl-js-progress mdl-progress__indeterminate' + (!this.props.report.fetching ? ' hide': '')
  }

  GetBarang(barang, id_barang) {
    const b =  barang.find((x) => {
      return x.ID == id_barang
    })
    if (b) {
      return b.NamaBarang
    }
    return '-'
  }

  GetSupplier(supplier, id_supplier) {
    const s =  supplier.find((x) => {
      return x.ID == id_supplier
    })
    if (s) {
      return s.NamaSupplier
    }
    return '-'
  }

  render()  {
    let ReportList = null
    let i = 0


    const data = this.props.report.data
    let OrderPendingTable = null

    if(data.OrderPending && data.OrderPending.length > 0) {
      let OrderPendingList = data.OrderPending.map((order) => {
        i++
        return (
          <tbody>
            <tr>
              <td>{this.GetBarang(data.Barang, order.BarangId)}</td>
              <td>{this.GetSupplier(data.Supplier, order.SupplierId)}</td>
              <td>{order.Jumlah}</td>
            </tr>
          </tbody>
        )
      })

      OrderPendingTable = (
        <tr>
          <th></th>
          <td>
            <table>
              <thead>
                <tr>
                  <th>Barang</th>
                  <th>Supplier</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              {OrderPendingList}
            </table>
          </td>
        </tr>
      )
    }
    let OrderApprovedTable = null

    if(data.OrderApproved && data.OrderApproved.length > 0) {
      let OrderApprovedList = data.OrderApproved.map((order) => {
        i++
        return (
          <tbody>
            <tr>
              <td>{this.GetBarang(data.Barang, order.BarangId)}</td>
              <td>{this.GetSupplier(data.Supplier, order.SupplierId)}</td>
              <td>{order.Jumlah}</td>
            </tr>
          </tbody>
        )
      })

      OrderApprovedTable = (
        <tr>
          <th></th>
          <td>
            <table>
              <thead>
                <tr>
                  <th>Barang</th>
                  <th>Supplier</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              {OrderApprovedList}
            </table>
          </td>
        </tr>
      )
    }
    let OrderDitolakTable = null

    if(data.OrderDitolak && data.OrderDitolak.length > 0) {
      let OrderDitolakList = data.OrderDitolak.map((order) => {
        i++
        return (
          <tbody>
            <tr>
              <td>{this.GetBarang(data.Barang, order.BarangId)}</td>
              <td>{this.GetSupplier(data.Supplier, order.SupplierId)}</td>
              <td>{order.Jumlah}</td>
            </tr>
          </tbody>
        )
      })

      OrderDitolakTable = (
        <tr>
          <th></th>
          <td>
            <table>
              <thead>
                <tr>
                  <th>Barang</th>
                  <th>Supplier</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              {OrderDitolakList}
            </table>
          </td>
        </tr>
      )
    }


    let OrderDicetakTable = null

    if(data.OrderDicetak && data.OrderDicetak.length > 0) {
      let OrderDicetakList = data.OrderDicetak.map((order) => {
        i++
        return (
          <tbody>
            <tr>
              <td>{order.Cetak}</td>
              <td>{this.GetBarang(data.Barang, order.BarangId)}</td>
              <td>{this.GetSupplier(data.Supplier, order.SupplierId)}</td>
              <td>{order.Jumlah}</td>
            </tr>
          </tbody>
        )
      })

      OrderDicetakTable = (
        <tr>
          <th></th>
          <td>
            <table>
              <thead>
                <tr>
                  <th>Nomer Order</th>
                  <th>Barang</th>
                  <th>Supplier</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              {OrderDicetakList}
            </table>
          </td>
        </tr>
      )
    }

    if (data) {
      const report = this.props.report.data
       ReportList = (
        <tbody>
        <tr>
          <th>Order Pending</th>
          <td>{report.OrderPending ? report.OrderPending.length : 0}</td>
        </tr>
        {OrderPendingTable}
        <tr>
          <th>Order Approved</th>
          <td>{report.OrderApproved ? report.OrderApproved.length : 0}</td>
        </tr>
        {OrderApprovedTable}
        <tr>
          <th>Order Dicetak</th>
          <td>{report.OrderDicetak ? report.OrderDicetak.length : 0}</td>
        </tr>
        {OrderDicetakTable}
        <tr>
          <th>Order Ditolak</th>
          <td>{report.OrderDitolak ? report.OrderDitolak.length : 0}</td>
        </tr>
        {OrderDitolakTable}
        <tr>
          <th>Total Order</th>
          <td>{report.TotalOrder}</td>
        </tr>
        <tr>
          <th>Total Barang</th>
          <td>{report.TotalBarang}</td>
        </tr>
        <tr>
          <th>Total Harga</th>
          <td>{toRp(report.TotalHarga)}</td>
        </tr>
        <tr>
          <th>Pembayaran Pending</th>
          <td>{report.PembayaranPending ? report.PembayaranPending.length : 0}</td>
        </tr>
        <tr>
          <th>Pembayaran Diinput</th>
          <td>{report.PembayaranDiinput ? report.PembayaranDiinput.length : 0}</td>
        </tr>
        <tr>
          <th>Pembayaran Lunas</th>
          <td>{report.PembayaranLunas ? report.PembayaranLunas.length : 0}</td>
        </tr>
      </tbody>
      )
    } 

    let ReportTable = null

    if(this.props.report.data) {
      ReportTable =  (
        <div>
          <table ref="mdl_table" className="mdl-data-table ml-table-striped mdl-js-data-table">
            <colgroup>
              <col className="auto-cell-size p-r-20"/>
            </colgroup>
              { ReportList }
          </table>

          <div className="hide ml-data-table-pager p-10 t-center">
            <span className="disabled previous">

              <button  className="mdl-button">«</button>
              <button  className="mdl-button">1</button>
              <button  className="mdl-button">2</button>
              <button  className="mdl-button">3</button>
              <button  className="mdl-button">4</button>
              <button  className="mdl-button">5</button>
              <button  className="mdl-button">»</button>
            </span>
          </div>
        </div>

      ) 
    } else if(this.props.report.fetching === false){
        ReportTable = (
          <h2 className="t-center">No data found</h2>
        )
      }

  let AnggaranOption = null
  let defaultAnggaran = null
  console.log(this.props.anggaran.fetching, this.props.anggaran.data.length)
  if (this.props.anggaran.fetching == false && this.props.anggaran.data.length > 0) {
    defaultAnggaran = this.props.anggaran.data[0].ID
    AnggaranOption = this.props.anggaran.data.map(function(ang) {
      console.log(ang)
      return (
        <option key={ang.ID} value={ang.ID}>{ang.Lokasi}</option>
      )
    })
  }
  console.log('option', AnggaranOption)
  console.log('defaultAnggaran', defaultAnggaran)

    const title = "Data report"
    const description = "Manajemen report aplikasi"
    return (
      <section className="tables-data">
        <TopBar
          color="blue-grey"
          title={title}
          description={description}
        />

        <div className="mdl-grid mdl-grid--no-spacing">


          <div className="mdl-cell mdl-cell--12-col  mdl-cell--12-col-tablet mdl-cell--12-col-phone">
            <div className="p-20 ml-card-holder ml-card-holder-first">
              <div className="mdl-card mdl-shadow--1dp m-b-30">
                <div className="mdl-card__title">
                  <h2 className="mdl-card__title-text"></h2>
                  <div className="mdl-grid mdl-grid--no-spacing">
                    <div className="mdl-cell mdl-cell--12-col">
                      <div className="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label anggaran-input">
                        <select className="mdl-selectfield__select" defaultValue={defaultAnggaran} onChange={this.handleAnggaranChange.bind(this)}>
                          {AnggaranOption}
                        </select>
                        <label className="mdl-selectfield__label" htmlhtmlFor="barang">Anggaran</label>
                      </div>
                    </div>
                  </div>
                </div>

                {ReportTable}
                <div id="p2" className={this.isFetching()}></div>

              </div>
            </div>
          </div>
        </div>
      </section>

    );
  }
}

function mapStateToProps(state) {
  return {
    report: state.report,
    anggaran: state.anggaran
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

const ReportContainer = connect(mapStateToProps, mapDispatchToProps)(Report)
module.exports = ReportContainer
