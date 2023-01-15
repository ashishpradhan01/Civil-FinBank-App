import React, { useEffect, useState } from 'react'
import { useAuthContext } from 'auth/AuthProvider'
import { Link } from 'react-router-dom';
import FlexBetween from './FlexBetween';

const getAllServices = async (token) => {
    const savedServiceResponse = await fetch(
        "http://localhost:7070/api/v1/services",
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: "GET",

        }
    );
    if (savedServiceResponse.status == "201") {
        return await savedServiceResponse.json();
    }
    return []
};
export default function NavBar() {
    const { state, setLogout } = useAuthContext();
    const isAuth = Boolean(state.token);
    const [services, setServices] = useState([]);
    //const fullName = state.user.fullName || "Test User";


    useEffect(() => {
        if (isAuth) {
            const data = getAllServices(state.token);
            console.log(data);
            setServices(data);
        }
    }, [])

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
                                    {console.log(services)}
                                    {/* <li><Link to={`/service/${s.id}`} className="hover-link">{s.type}</Link></li> */}
                                    {/* <li><Link to="/service" className="hover-link">adasdadadadadasd</Link></li>
                                    <li><Link to="/service" className="hover-link">adasdadadadadasd</Link></li> */}
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
