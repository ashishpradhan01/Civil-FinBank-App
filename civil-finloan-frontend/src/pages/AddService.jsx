import { useAuthContext } from 'auth/AuthProvider';
import FlexBetween from 'components/FlexBetween';
import NavBar from 'components/NavBar';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddService() {
    const navigate = useNavigate();
    const { state, setServices } = useAuthContext();
    const [type, setType] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const addService = async (data) => {
        const savedServiceResponse = await fetch(
            "http://localhost:7070/api/v1/services",
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${state.token}`
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        if (savedServiceResponse.status == 201) {
            setServices([...state.services, await savedServiceResponse.json()])
            navigate("/")
        }
        else {
            console.log("something went wrong")
        }
    };
    return (
        <>
            <NavBar />
            <FlexBetween style={{ justifyContent: "center", padding: "50px" }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    const data = {
                        type,
                        code,
                        description,
                        imgUrl
                    }
                    addService(data);
                }}>
                    <fieldset className='form'>
                        <legend>Add Service</legend>
                        <div>
                            <label htmlFor="typeOfService"><b>Type</b></label>
                            <input id="typeOfService" type="text" required value={type} onChange={(e) => setType(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="code"><b>Code</b></label>
                            <input type="tel" id="code"
                                maxLength={10}
                                required
                                value={code} onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="description"><b>Description</b></label>
                            <textarea id="description" type="text" required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="picture"><b>Picture</b></label>
                            <input id="picture" type="file" multiple={false} accept="image/*" required onChange={(e) => setImgUrl(String(e.target.files[0].name))} />
                        </div>
                        <button className='primary-button'>Add</button>
                    </fieldset>
                </form>
            </FlexBetween>
        </>
    )
}
