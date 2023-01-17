import { createContext, useContext, useReducer } from "react";
const AuthContext = createContext();

const initalState = {
    user: null,
    token: null,
    services: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case "Login":
            return { ...state, user: action.payload.user, token: action.payload.token }
        case "Logout":
            return { ...state, user: null, token: null }
        case "Service":
            return { ...state, services: action.payload.services }
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

    const setServices = (services) => {
        dispatch({ type: "Service", payload: { services } });
    }

    return <AuthContext.Provider value={{ state, setLogin, setLogout, setServices }}>
        {children}
    </AuthContext.Provider>
}