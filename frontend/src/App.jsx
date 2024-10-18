// src/App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationContainer from "./navigation/NavigationContainer";
import Inicio from "./pages/Inicio";
import Ofertas from "./pages/Ofertas";
import Servicios from "./pages/Servicios";
import BlogDetail from "./pages/BlogDetail";
import NoMatch from "./pages/NoMatch";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminPanelPage from "./pages/AdminPanelPage";
import Icons from "./helpers/Icon";
import CheckoutForm from "./pagos/CheckoutForm";
import CookieConsentBanner from "./cookies/CookieConsentBanner"; // Importa el componente de consentimiento de cookies
import ContactButtons from "./ContactButtons/ContactButtons";
import "./style/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Footer from "./footer/Footer";
import Conocenos from "./pages/Conócenos";

const stripePromise = loadStripe(
  "pk_test_51QAGC6EJxV1jBn9lcFqz8F4GTgt50k9GGwjSmTIQh2QNVYsqbtgwtC4ul8tZN6IZOMV3Sys2bRPxlyMZRn6bN81l00vXkUwXeV"
  
);

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    const storedLoggedInStatus =
      localStorage.getItem("loggedInStatus") || "NOT_LOGGED_IN";

    this.state = {
      loggedInStatus: storedLoggedInStatus,
      checkingAuth: true,
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    axios
      .get("https://api.devcamp.space/logged_in", { withCredentials: true })
      .then((response) => {
        const loggedIn = response.data.logged_in;
        const { loggedInStatus } = this.state;

        if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            checkingAuth: false,
          });
          localStorage.setItem("loggedInStatus", "LOGGED_IN");
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            checkingAuth: false,
          });
          localStorage.setItem("loggedInStatus", "NOT_LOGGED_IN");
        } else {
          this.setState({ checkingAuth: false });
        }
      })
      .catch((error) => {
        console.log("Error al verificar el estado de la sesión:", error);
        this.setState({ checkingAuth: false });
      });
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });
    localStorage.setItem("loggedInStatus", "LOGGED_IN");
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
    localStorage.setItem("loggedInStatus", "NOT_LOGGED_IN");
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
    localStorage.setItem("loggedInStatus", "NOT_LOGGED_IN");
  }

  render() {
    const { loggedInStatus, checkingAuth } = this.state;

    if (checkingAuth) {
      return <div>Cargando autenticación...</div>;
    }

    return (
      <div className="container">
        <Router>
          <div>
            {/* Barra de navegación */}
            <NavigationContainer
              loggedInStatus={loggedInStatus}
              handleSuccessfulLogin={this.handleSuccessfulLogin}
              handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />

            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/conocenos" element={<Conocenos />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="*" element={<NoMatch />} />

              {/* Ruta protegida para AdminPanel */}
              <Route
                path="/AdminPanelPage"
                element={
                  <ProtectedRoute loggedInStatus={loggedInStatus}>
                    <AdminPanelPage userName="Juanito" />
                  </ProtectedRoute>
                }
              />

              {/* Ruta para el formulario de pago de Stripe */}
              <Route
                path="/checkout"
                element={
                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                }
              />
            </Routes>
          </div>
        </Router>
        <ContactButtons />
        <Footer />
        <CookieConsentBanner />{" "}
        {/* Agrega el banner de consentimiento de cookies aquí */}
      </div>
    );
  }
}
