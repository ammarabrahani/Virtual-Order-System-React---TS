import "antd/dist/antd.min.css";
import "./assets/scss/main.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider as Store } from "react-redux";
import store from "./store";

import AppRoutes from "./routes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuthUser } from "./services/network";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      getAuthUser()
        .then((response) => {
          if (response.data.success) {
            if (window.location.pathname === "/login") {
              navigate("/");
            }
          }
        })
        .catch((e) => {});
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Store store={store}>
      <AppRoutes />
      <ToastContainer />
    </Store>
  );
}

export default App;
