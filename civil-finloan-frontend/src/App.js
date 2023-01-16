import { useAuthContext } from "auth/AuthProvider";
import NavBar from "components/NavBar";
import AboutUs from "pages/AboutUs";
import AddService from "pages/AddService";
import EmiCalculator from "pages/EmiCalculator";
import HomePage from "pages/HomePage";
import JoinAsMember from "pages/JoinAsMember";
import LoginPage from "pages/LoginPage";
import ServicePage from "pages/ServicePage";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const getAllServices = async (token) => {
  const serviceResponse = await fetch("http://localhost:7070/api/v1/services", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });
  if (serviceResponse.status === 200) {
    return await serviceResponse.json();
  }
  return [];
};

function App() {
  const { state, setServices } = useAuthContext();
  const isAuth = Boolean(state.token);

  useEffect(() => {
    if (isAuth) {
      getAllServices(state.token)
        .then((data) => {
          setServices(data);
        })
        .catch((err) => {
          console.log("[Nav Service]", err);
          setServices([]);
        });
    }
  }, [state]);

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
