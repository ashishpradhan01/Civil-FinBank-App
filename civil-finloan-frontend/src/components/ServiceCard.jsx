import React from 'react'
import FlexBetween from './FlexBetween'
import { Link } from 'react-router-dom'

export default function ServiceCard({ service }) {
    return (
        <FlexBetween style={{ flexDirection: "column", width: "20%", minHeight: "300px", border: "2px solid grey", margin: "20px", alignItems: "start" }}>
            <div style={{ width: "100%", padding: "0.5rem" }}>
                <img src={`/images/${service.imgUrl}`} alt="logo" style={{ width: "100%", height: "200px" }} />
            </div>
            <div style={{ padding: "0.5rem" }}>
                <h4>{service.type}</h4>
                <p style={{ marginBottom: "10px" }}>{service.description}</p>
                <Link to={`/services/${service.id}`} className="primary-button">More Details</Link>
            </div>
        </FlexBetween>
    )
}


