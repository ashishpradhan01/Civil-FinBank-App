import { type } from '@testing-library/user-event/dist/type'
import { useAuthContext } from 'auth/AuthProvider'
import FlexBetween from 'components/FlexBetween'
import NavBar from 'components/NavBar'
import React, { useState } from 'react'

function calculateEmi(amount, rate, time) {
    const rateMonth = Math.pow((1 + rate), time);
    return ((amount * rate * rateMonth) / (rateMonth - 1));
}

export default function EmiCalculator() {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [emi, setEmi] = useState({ type: "", code: "", amount: "", tenure: "" })
    const { state } = useAuthContext();
    const services = state.services ? state.services : [];
    const serviceType = (services.filter(service => service.type === emi.type))[0];
    const detail = serviceType ? serviceType.detail : [];

    return (
        <FlexBetween style={{ justifyContent: "center", padding: "50px" }}>
            {services.length ? <form onSubmit={(e) => {
                e.preventDefault()
                setError("")
                setSuccess("")
                const det = (detail.filter(d => d.type == emi.code))[0]
                const isValidAmount = det.min <= Number(emi.amount) && Number(emi.amount) <= det.max;
                const isValidTenure = Number(emi.tenure) <= det.tenure;

                if (!isValidAmount) {

                    setError(`Loan amount: $${det.min} - $${det.max}`)
                }
                if (!isValidTenure) {

                    setError(`Tenure: ${det.tenure}`);
                }

                if (isValidAmount && isValidTenure) {
                    const estimateEmi = calculateEmi(Number(emi.amount), det.rate, Number(emi.tenure)).toFixed(2);
                    setSuccess(`The estimate EMI amount is $${estimateEmi} on rate of ${det.rate}`)
                }
            }}>
                <fieldset className='form'>
                    <legend>EMI Calculator</legend>
                    <div>
                        <label><b>Loan Type</b></label>
                        <select value={emi.type} className='emi-select' onChange={(e) => setEmi({ ...emi, "type": e.target.value })}>
                            <option value="">--- Select Loan Type ---</option>
                            {services.map((service) => <option key={service.id} value={service.type}>{service.type}</option>)}
                        </select>
                    </div>
                    <div>
                        <label><b>Code</b></label>
                        <select value={emi.code} className='emi-select' onChange={(e) => setEmi({ ...emi, "code": e.target.value })}>
                            <option value="">--- Select Code ---</option>
                            {detail.map((detail) => <option key={detail.id} value={detail.type}>{detail.type}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="amount"><b>Loan Amount</b></label>
                        <input id="amount" type="number" required value={emi.amount} onChange={(e) => setEmi({ ...emi, "amount": e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="tenure"><b>Tenure</b></label>
                        <input id="tenure" type="number" required value={emi.tenure} onChange={(e) => { setEmi({ ...emi, "tenure": e.target.value }) }} />
                    </div>
                    <button className='primary-button'>Add</button>

                </fieldset>
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <span className='error'>{error}</span>
                    <span className='success'>{success}</span>
                </div>
            </form> : <h4>No Service Available</h4>
            }
        </FlexBetween >
    )
}
