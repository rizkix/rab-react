import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/ActionUser'
import TopBar from '../views/TopBar'
let ACTION = 'CREATE'

class UserUpgrade extends React.Component {
  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
  }

  componentWillMount(){
    let userId  = this.props.params.userId ? this.props.params.userId : null
    if (userId) {
      ACTION = 'UPDATE'
    } else {
      ACTION = 'CREATE'
    }
    this.setState({
      userId
    })

    this.props.actions.prepareUpgrade(ACTION, userId)
  }

  componentDidUpdate() {
    let user = this.props.user.upgradeData.User
    let role = this.props.user.upgradeData.Role

    if (user) {
      this.refs.nama.value = user.Nama
      this.refs.username.value = user.Username
      this.refs.role.value = user.Role
      componentHandler.upgradeDom();
    }       

    if (ACTION == 'CREATE' && role) {
      this.refs.role.value = role[0]
      componentHandler.upgradeDom();
    }


  }

  handleSave(e) {
    e.preventDefault()
    if (ACTION == 'CREATE') {
      this.props.actions.create(this.refs)
    } else if (ACTION == 'UPDATE') {
      this.props.actions.update(this.refs)
    }

  }


  componentWillUnmount() {
    ACTION = 'CREATE'
  }

  render() {
    let user = this.props.user.upgradeData.User
    let roles = this.props.user.upgradeData.Role


    let roleSelect = null
    if (roles) {
      roleSelect = roles.map((role) => {
        let selected = false
        if (user && role == user.Role) {
          selected = true;
        }
        return (
          <option value={role} key={role}>
            {role}
          </option>
        )
      })
    }


    const title = ACTION == 'CREATE' ? 'Tambah User' : 'Edit User'
    const description = 'Edit user yang terdaftar pada aplikasi.'
    const color = ACTION == 'CREATE' ? 'brown' : 'amber'
    return (

      <section className="text-fields">
        <TopBar
          color={color}
          title={title}
          description={description}
        />

        <div className="mdl-grid mdl-grid--no-spacing">

          <div className="mdl-cell mdl-cell--3-col mdl-cell--12-col-tablet mdl-cell--12-col-phone mdl-color--grey-100 no-p-l">
            <div className="p-40 p-r-20 p-20--small">
              <div className=" mdl-color-text--blue-grey-400">
                <h3><i className="material-icons f-left m-r-5">format_align_left</i> Bantuan</h3>
                <p>Input data user untuk menunjang akses user aplikasi dan manajemen laporan.</p>
              </div>
            </div>
          </div>

          <div className="mdl-cell mdl-cell--9-col mdl-cell--12-col-tablet mdl-cell--12-col-phone no-p-l">
            <div className="p-20 ml-card-holder ml-card-holder-first">
              <div className="mdl-card mdl-shadow--1dp">
                <div className="p-30">
                  {this.props.user.status && this.props.user.status.error  ? <div className='alert alert-info text-red'>{this.props.user.status.message}</div> : ''}
                  <form onSubmit={this.handleSave}>
                    <input ref="id" type="hidden" value={user ? user.ID : ''}/>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                      <input ref="nama" className="mdl-textfield__input" type="text" id="sample2" />
                      <label className="mdl-textfield__label" htmlFor="sample2">Nama</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                      <input ref="username" className="mdl-textfield__input" type="text" id="sample2" />
                      <label className="mdl-textfield__label" htmlFor="sample2">Username</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                      <input ref="password" className="mdl-textfield__input" type="password" id="sample2" />
                      <label className="mdl-textfield__label" htmlFor="sample2">Password</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                      <input ref="confirmPassword" className="mdl-textfield__input" type="password" id="sample2" />
                      <label className="mdl-textfield__label" htmlFor="sample2">Confirm Password</label>
                    </div>
                    <div className="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                      <select ref="role" className="mdl-selectfield__select" defaultValue={user ? user.Role : ''}>
                        {roleSelect}
                      </select>
                      <label className="mdl-selectfield__label" htmlhtmlFor="gender">Role</label>
                      <span className="mdl-selectfield__error">Pilih role user</span>
                    </div>
                    <div className="m-t-20">
                      <button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>




        </div>  
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

const UserUpgradeContainer = connect(mapStateToProps, mapDispatchToProps)(UserUpgrade)
module.exports = UserUpgradeContainer
