import React, { useEffect, useState } from 'react'
import NavBar from 'components/NavBar';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import { useAuthContext } from 'auth/AuthProvider';


export default function JoinAsMember() {
    const navigate = useNavigate();
    const { state, setLogin } = useAuthContext();
    const isAuth = Boolean(state.token);
    const [name, setName] = useState(isAuth ? state.user.fullName : "");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState(isAuth ? state.user.mobile : "");
    const [password, setPassword] = useState("");

    const update = async (data) => {
        const savedUserResponse = await fetch(
            "http://localhost:7070/api/v1/auth/update",
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(data),
            }
        );
        const savedUser = await savedUserResponse.json();

        if (savedUser) {
            setLogin(savedUser)
            navigate("/")
        }
        else {
            console.log("Something went wrong")
        }
    }

    const register = async (data) => {
        const savedUserResponse = await fetch(
            "http://localhost:7070/api/v1/auth/register",
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const savedUser = await savedUserResponse.json();

        if (savedUser) {
            setLogin(savedUser)
            navigate("/")
        }
        else {
            console.log("Something went wrong")
        }
    };
    return (
        <>
            <FlexBetween style={{ justifyContent: "center", padding: "50px" }}>
                <form onSubmit={(e) => {
                    e.preventDefault()

                    if (isAuth) {
                        let data = {
                            "id": state.user.id,
                            "fullName": name,
                            "email": state.user.email,
                            "mobile": Number(mobile),
                            "password": state.user.password,
                            "role": state.user.role
                        }
                        update(data);
                    }
                    else {
                        let data = {
                            "fullName": name,
                            "email": email,
                            "mobile": Number(mobile),
                            "password": password
                        }
                        register(data);
                    }

                }}>
                    <fieldset className='form'>
                        {isAuth ? <legend>Update Member</legend> : <legend>Join As Member</legend>}
                        <div>
                            <label htmlFor="fullname"><b>Full Name</b></label>
                            <input id="fullname" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="mobile"><b>Mobile</b></label>
                            <input type="tel" id="phone" name="phone"
                                pattern="[0-9]{10}"
                                maxLength={10}
                                required value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email"><b>Email</b></label>
                            {isAuth ? <input id="email" type="email" required value={state.user.email} disabled /> :
                                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />}
                        </div>
                        {isAuth ? null : <div>
                            <label htmlFor="password"><b>Password</b></label>
                            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>}
                        {isAuth ? <button className='primary-button'>Update</button> :
                            <button className='primary-button'>Join Us</button>}
                    </fieldset>
                </form>
            </FlexBetween>
        </>
    )
}
