import { createContext, useContext, useReducer } from "react";
const AuthContext = createContext();

const initalState = {
    user: null,
    token: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "Login":
            return { user: action.payload.user, token: action.payload.token }
        case "Logout":
            return { user: null, token: null }
        default:
            return state;
    }
};

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initalState);

    const setLogin = ({ user, token }) => {
        dispatch({ type: "Login", payload: { user, token } });
    }
    const setLogout = () => {
        dispatch({ type: "Logout" });
    }

    return <AuthContext.Provider value={{ state, setLogin, setLogout }}>
        {children}
    </AuthContext.Provider>
}