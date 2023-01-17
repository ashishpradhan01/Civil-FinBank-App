import NavBar from 'components/NavBar'
import React from 'react'
import { Link } from 'react-router-dom'

export default function AboutUs() {
    return (

        <div style={{ padding: "50px 190px", width: "75%" }}>
            <h2>About Us</h2>
            <p style={{ marginBlock: "20px" }}>Civil-Finloan is a finance management company which is providing the extensive array of services by providing loans to citizens, Money transfer, wealth management and also leading on providing micro loans to agriculture and small businesses in the rural regions.</p>
            <Link to="/" className='secondary-button'>Explore Home</Link>
        </div>

    )
}
