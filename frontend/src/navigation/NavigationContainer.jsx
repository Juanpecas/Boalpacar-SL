import React, { Component } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BannerLogo from "../pages/BannerLogo";
import ReservaControl from "../modal/ReservaControl";
import AuthButton from "../auth/AuthBotton";

class NavigationComponent extends Component {
  render() {
    return (
      <div className="nav-wrapper">
        <div className="left-side">
          <div className="nav-link-wrapper">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-link-active" : "")}
            >
              <BannerLogo />
            </NavLink>
          </div>
          {["/inicio", "/servicios", "/ofertas", "/conocenos"].map(
            (path) => (
              <div className="nav-link-wrapper" key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "nav-link-active" : ""
                  }
                >
                  {path === "/inicio"
                    ? "Inicio"
                    : path.replace("/", "").replace("-", " ")}
                </NavLink>
              </div>
            )
          )}

          {this.props.loggedInStatus === "LOGGED_IN" && (
            <div className="nav-link-wrapper">
              <NavLink
                to="/AdminPanelPage"
                className={({ isActive }) =>
                  isActive ? "nav-link-active" : ""
                }
              >
                Panel de Administración
              </NavLink>
            </div>
          )}
          <ReservaControl />
        </div>

        <AuthButton
          loggedInStatus={this.props.loggedInStatus}
          handleSuccessfulAuth={this.props.handleSuccessfulAuth}
          handleUnsuccessfulAuth={this.props.handleUnsuccessfulAuth}
          handleSuccessfulLogout={this.props.handleSuccessfulLogout}
        />
      </div>
    );
  }
}

// HOC para usar navigate en un componente de clase
function WithNavigateWrapper(props) {
  const navigate = useNavigate();
  return <NavigationComponent {...props} navigate={navigate} />;
}

export default WithNavigateWrapper;
