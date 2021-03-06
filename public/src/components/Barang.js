import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/ActionBarang'
import { Link, browserHistory } from 'react-router'
import $ from 'jquery'
import TopBar from '../views/TopBar'
import {limit} from '../utils/index'


class Barang extends React.Component {
  constructor(props) {
    super(props)
  }


  componentWillMount() {
    this.props.actions.getBarangs()
  }


  handleEdit(id) {
    browserHistory.push(`barang/edit/${id}`)
  }

  componentDidUpdate() {
    const _this = this
    $('table').on('change','td .mdl-checkbox__input',function(){
      var checked = []
      $('td .mdl-checkbox__input').each(function(i, k){
        this.checked && checked.push(_this.props.barang.data[i])
      });
      _this.props.actions.selectBarangs(checked)
    })
    componentHandler.upgradeDom();
  }

  isFetching() {
    return 'mdl-progress mdl-js-progress mdl-progress__indeterminate' + (!this.props.barang.fetching ? ' hide': '')
  }

  render()  {
    let BarangList = null
    let i = 0
    if (this.props.barang.data.length > 0) {
      BarangList = this.props.barang.data.map((barang) => {
        i++
          return (
            <tr key={barang.ID}>
              <td>{i}</td>
              <td>{barang.NamaBarang}</td>
              <td>{barang.Satuan}</td>
              <td className={limit(this)}>
                <button onClick={this.handleEdit.bind(this, barang.ID)} className="mdl-button mdl-js-button mdl-button--fab mdl-button--tiny-fab mdl-js-ripple-effect mdl-button--accent">
                  <i className="material-icons">edit</i>
                </button>
              </td>
            </tr>
          )
      })
    } else if(this.props.barang.fetching === false){

      BarangList = (
        <tr>
          <td colSpan="4">No data found</td>
        </tr>
      )
    }

    let BarangTable = null

    if(this.props.barang.data.length > 0) {
      BarangTable =  (
        <div>
          <table ref="mdl_table" className="mdl-data-table ml-table-striped mdl-js-data-table mdl-data-table--selectable">
            <colgroup>
              <col className="auto-cell-size p-r-20"/>
            </colgroup>
            <thead>
              <tr>
                <th className="mdl-data-table__header--sorted-ascending">No</th>
                <th>Nama Barang</th>
                <th>Satuan</th>
                <th className={limit(this)}>Action</th>
              </tr>
            </thead>
            <tbody>
              { BarangList }
            </tbody>
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

    }

    const title = "Data barang"
    const description = "Manajemen barang aplikasi"
    return (
      <section className="tables-data">
        <TopBar
          color="blue-grey"
          title={title}
          description={description}
        />

        <div className="mdl-grid mdl-grid--no-spacing">

          <div className="mdl-cell mdl-cell--3-col mdl-cell--12-col-tablet mdl-cell--12-col-phone mdl-color--grey-100">
            <div className="p-40 p-20--small">

              <div className={'mdl-color-text--blue-grey-400 sticky ' + limit(this)} ml-sticky offset="80" body-className="mdl-layout__content">
                <p>Klik menu dibawah untuk menambah/menghapus barang</p>
                <div className="m-t-30">
                  <ul className="list-bordered">
                    <li><Link to="/barang/add">
                        <i className="material-icons m-r-5 f11">add</i>
                        Tambah barang
                    </Link></li>
                    <li><a href="">
                        <i className="material-icons m-r-5 f11">delete</i>
                        Delete
                    </a></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <div className="mdl-cell mdl-cell--9-col  mdl-cell--12-col-tablet mdl-cell--12-col-phone">
            <div className="p-20 ml-card-holder ml-card-holder-first">
              <div className="mdl-card mdl-shadow--1dp m-b-30">
                <div className="mdl-card__title">
                  <h2 className="mdl-card__title-text"></h2>
                </div>
                {BarangTable}
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
    barang: state.barang,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

const BarangContainer = connect(mapStateToProps, mapDispatchToProps)(Barang)
module.exports = BarangContainer
