
import { useAuthContext } from 'auth/AuthProvider';
import FlexBetween from 'components/FlexBetween';
import NavBar from 'components/NavBar';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const { state, logout } = useAuthContext();
    const isAuth = Boolean(state.token);
    console.log(state);

    return (
        <>
            <NavBar />
            <div>
                {isAuth ? <p>{state.user.fullName}</p> : null}
                <header>
                    <div className='header-caption'>If you're not making mistakes, then you're not doing anything</div>
                </header>
                <main>
                    <FlexBetween style={{ justifyContent: "center" }}>
                        <FlexBetween style={{ textAlign: "center", flexDirection: "column", maxWidth: "50%", marginTop: "30px" }}>
                            <h2>An Hub For Your Finiancial Needs</h2>
                            <p style={{ marginTop: "20px" }}>We offer the extensive array of services by providing loans to citizens, Money transfer, wealth management and also leading on providing more loans to agriculture and small businessess in the rural regions.</p>
                        </FlexBetween>
                    </FlexBetween>
                </main>
            </div>
        </>
    )
}
