
import { useAuthContext } from 'auth/AuthProvider';
import FlexBetween from 'components/FlexBetween';
import NavBar from 'components/NavBar';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { setLogin } = useAuthContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const login = async (data) => {
        const savedUserResponse = await fetch(
            "http://localhost:7070/api/v1/auth/login",
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
            location.state ? navigate(location.state.previousUrl) : navigate('/')
        }
        else {
            console.log("something went wrong")
        }
    }

    return (
        <>
            <FlexBetween style={{ justifyContent: "center", padding: "50px" }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    const data = {
                        email,
                        password
                    }
                    login(data);
                    navigate("/");
                }}>
                    <fieldset className='form'>
                        <legend>Login</legend>
                        <div>
                            <label htmlFor="email"><b>Email</b></label>
                            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password"><b>Password</b></label>
                            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='primary-button'>Login</button>
                    </fieldset>
                </form>
            </FlexBetween>
        </>
    )
}
