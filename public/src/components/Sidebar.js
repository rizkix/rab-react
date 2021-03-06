import React from 'react'
import { Link } from 'react-router'


const MenuItem = function(props) {
    return(
        <li>
            <Link className="mdl-navigation__link" to={props.link}>
                <i className="mdl-color-text--blue-grey-400 material-icons">{props.icon}</i>
                {props.name}
            </Link>
        </li>
    );
}


class Sidebar extends React.Component {

    render() {
        let username = this.props.auth.username
        return (
            <div className="demo-drawer mdl-layout__drawer mdl-color-text--blue-grey-50 mdl-color--grey-900">
                <header className="mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">

                    <div className="brand-logo">
                        <div className="logo">
                            <div className="foot1"></div>
                            <div className="foot2"></div>
                            <div className="foot3"></div>
                            <div className="foot4"></div>
                            <div className="foot5"></div>
                        </div>
                    </div>

                    <div className="clear">
                        <div className="f-left m-l-30 m-r-10">
                          <img src={process.env.ROOT_URL + "/assets/img/icons/ballicons/workspace.svg"} className="demo-avatar img-responsive"/>
                        </div>
                        <div className="f-left">
                            <h4 className="mdl-color-text--white m-t-6 no-m-b">R.A.B</h4>
                            <div className="hide mdl-color-text--blue-grey-400 f12"><i className=" material-icons f12">place</i></div>
                        </div>
                    </div>
                    <div className="demo-avatar-dropdown">
                        <span>{ username }</span>
                        <div className="mdl-layout-spacer"></div>
                        <button id="accbtn" className="hide mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                            <i className="material-icons f14">menu</i>
                        </button>
                        <ul className="hide mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
                            <li className="mdl-menu__item">Logout</li>
                        </ul>
                    </div>
                </header>

                <ul ml-menu close-others="false" className="demo-navigation mdl-navigation">
                    <MenuItem link="/user" name="User" icon="recent_actors"/>
                    <MenuItem link="/barang" name="Barang" icon="work"/>
                    <MenuItem link="/supplier" name="Supplier" icon="business"/>
                    <MenuItem link="/anggaran" name="RAB" icon="format_list_numbered"/>
                    <MenuItem link="/project_order" name="Project Order" icon="local_shipping"/>
                    <MenuItem link="/pembayaran" name="Pembayaran" icon="payment"/>
                    <MenuItem link="/report" name="Report" icon="report"/>
                    <MenuItem link="/logout" name="Logout" icon="exit_to_app"/>
                </ul>
            </div>
        )
    }

}

module.exports = Sidebar
