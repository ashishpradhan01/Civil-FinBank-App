import { useAuthContext } from 'auth/AuthProvider';
import Detail from 'components/Detail';
import FlexBetween from 'components/FlexBetween';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';


export default function ServicePage() {
    const { serviceId } = useParams();
    const { state, setServices } = useAuthContext();
    const isAuth = Boolean(state.token);
    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState({ type: "", max: 0, min: 0, tenure: 0, rate: 0 });
    const service = (state.services.filter(ser => ser.id === Number(serviceId)))[0];

    const addDetail = async (data) => {
        const savedServiceResponse = await fetch(
            `http://localhost:7070/api/v1/services/${serviceId}/detail`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${state.token}`
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        if (savedServiceResponse.status === 201) {
            const newService = await savedServiceResponse.json();
            const removedOldService = state.services.filter(ser => ser.id !== Number(serviceId));
            setServices([...removedOldService, newService])
            setShow(false);
        }
        else {
            console.log("something went wrong")
        }
    };

    return (
        service ? <div style={{ margin: "20px" }} >
            <div>
                <h2>{service.type}</h2>
                <p>{service.description}</p>
                {isAuth && state.user.role === "ADMIN" ? <button className='secondary-button' style={{ margin: "10px 0" }} onClick={() => setShow(!show)}>Add Details</button> : null}
            </div>

            {show ? <FlexBetween style={{ justifyContent: "start" }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    addDetail(detail);
                }}>
                    <fieldset className='form'>
                        <legend>Add Detail</legend>
                        <div>
                            <label htmlFor="typeOfService"><b>Type</b></label>
                            <input id="typeOfService" type="text" required value={detail.type} onChange={(e) => setDetail({ ...detail, "type": e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="min"><b>Min</b></label>
                            <input type="number" id="min"
                                required
                                value={detail.min} onChange={(e) => setDetail({ ...detail, "min": e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="min"><b>Max</b></label>
                            <input type="number" id="min"
                                required
                                value={detail.max} onChange={(e) => setDetail({ ...detail, "max": e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="tenure"><b>Tenure</b></label>
                            <input id="tenure" type="number" required value={detail.tenure} onChange={(e) => setDetail({ ...detail, "tenure": e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="max"><b>Rate</b></label>
                            <input id="max" type="number" required value={detail.rate} onChange={(e) => setDetail({ ...detail, "rate": e.target.value })} />
                        </div>
                        <button className='primary-button'>Add</button>
                    </fieldset>
                </form>
            </FlexBetween> : null}


            <hr />


            {service.detail.map(det => <Detail details={det} key={det.id} />)}

        </div> : null

    )
}
