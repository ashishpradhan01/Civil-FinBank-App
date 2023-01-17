import React from 'react'

export default function Detail({ details }) {
    return (
        <div style={{ padding: "1rem" }}>
            <h3>Type: {details.type}</h3>
            <div style={{ marginLeft: "5px" }}>
                <ul>
                    <li>Minimum Amount: ${details.min}</li>
                    <li>Maximum Amount: ${details.max}</li>
                    <li>Tenure: {details.tenure} (days/month)</li>
                </ul>
            </div>
            <hr />
        </div>
    )
}
