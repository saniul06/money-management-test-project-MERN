import React, { Component } from 'react'
import { Link, withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/authActions'

export class navigation extends Component {
    render() {
        console.log('in navgation')
        console.log(this.props.history)
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to='/'>
                    <span className='navbar-brand'>Money</span>
                </Link>
                <button className="navbar-toggler"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to='/' className='active' exact>
                                <span className="nav-link">Home</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/dashboard' className='active'>
                                <span className="nav-link">Dashboard</span>
                            </NavLink>
                        </li>

                        {this.props.auth.isAuthenticated ? (
                            <li className="nav-item">

                                <button onClick={() => this.props.logout(this.props.history)} className="btn btn-danger">Logout</button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink to='/register' className='active'>
                                        <span className="nav-link">Register</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/login' className='active'>
                                        <span className="nav-link">Login</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(withRouter(navigation))
