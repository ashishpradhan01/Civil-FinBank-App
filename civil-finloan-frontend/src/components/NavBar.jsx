import React, { useEffect, useState } from 'react'
import { useAuthContext } from 'auth/AuthProvider'
import { Link } from 'react-router-dom';
import FlexBetween from './FlexBetween';


export default function NavBar() {
    const { state, setLogout } = useAuthContext();
    const isAuth = Boolean(state.token);
    const services = state.services ? state.services : [];

    return (
        <nav className='bg-primary'>
            <FlexBetween style={{ padding: "0.6rem 1%", flexDirection: "row" }}>
                <FlexBetween >
                    <Link to="/" style={{ marginRight: "30px" }}><h3>Civil Finloan</h3></Link>
                    <div className="nav-links">
                        <ul className="flex">
                            <li><Link to="/aboutus" className="hover-link">About Us</Link></li>
                            {isAuth ? <li className='services'><Link to="" className="hover-link">Services</Link>
                                <ul className='dropdown'>
                                    {services.map((service) => <li key={service.id}><Link to={`/service/${service.id}`} className="hover-link">{service.type}</Link></li>)}
                                </ul>
                            </li> : null}
                        </ul>
                    </div>
                </FlexBetween>
                <FlexBetween>
                    <div className="nav-links">
                        <ul className="flex">
                            {/* {isAuth && state.user.role == "ADMIN" ? */}
                            <li><Link to="/addservice" className="hover-link">Add Service</Link></li>
                            <li><Link to="/emicalculator" className="hover-link">EMI Calculator</Link></li>
                            <li> {isAuth ? <Link to="/update" className="hover-link">Update Profile</Link> :
                                <Link to="/joinasmember" className="hover-link">Join as a member</Link>}
                            </li>
                            <li>{isAuth ? <a className="primary-button" onClick={() => setLogout()}>Logout</a> :
                                <Link to="/login" className="primary-button">Login</Link>}
                            </li>
                        </ul>
                    </div>
                </FlexBetween>
            </FlexBetween>
        </nav >
    )
}
