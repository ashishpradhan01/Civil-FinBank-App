import { useAuthContext } from "auth/AuthProvider";
import NavBar from "components/NavBar";
import AboutUs from "pages/AboutUs";
import AddService from "pages/AddService";
import EmiCalculator from "pages/EmiCalculator";
import HomePage from "pages/HomePage";
import JoinAsMember from "pages/JoinAsMember";
import LoginPage from "pages/LoginPage";
import ServicePage from "pages/ServicePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const { state } = useAuthContext();
  const isAuth = Boolean(state.token);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/" /> : <LoginPage />}
          ></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/addservice"
            element={
              // isAuth && state.user.role == "ADMIN" ? (
              true ? <AddService /> : <Navigate to="/" />
            }
          >
            {" "}
          </Route>
          <Route path="/joinasmember" element={<JoinAsMember />}></Route>
          <Route path="/update" element={<JoinAsMember />}></Route>
          <Route path="/emicalculator" element={<EmiCalculator />}></Route>
          <Route path="/aboutus" element={<AboutUs />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
