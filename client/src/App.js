import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import "../node_modules/antd/dist/antd.css";
import Home from "./pages/home/Home";
import Signup from "./pages/register/Signup";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./redux/actions/userActions";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("kanban-user"));
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute path="/" component={Home} />}
          />
          <Route
            path="/login"
            element={
              <PublicRoute path="/login" restricted={true} component={Login} />
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute
                path="/signup"
                restricted={true}
                component={Signup}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
