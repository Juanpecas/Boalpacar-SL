import React, { Component } from "react";
import axios from "axios";
import PortfolioSidebarList from "../portfolio/PortfolioSidebarList";
import PortfolioForm from "../portfolio/PortfolioForm";

export default class AdminPanelPage extends Component {
  state = {
    portfolioItems: [],
    portfolioToEdit: {},
  };

  componentDidMount() {
    this.getPortfolioItems();
  }

  getPortfolioItems = async () => {
    try {
      const response = await axios.get(
        "https://juanito.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",
        { withCredentials: true }
      );
      this.setState({
        portfolioItems: response.data.portfolio_items,
      });
    } catch (error) {
      console.error("Error fetching portfolio items", error);
    }
  };

  handleNewFormSubmission = (portfolioItem) => {
    this.setState((prevState) => ({
      portfolioItems: [portfolioItem, ...prevState.portfolioItems],
    }));
  };

  handleEditFormSubmission = () => {
    this.getPortfolioItems(); 
  };

  handleEditClick = (portfolioItem) => {
    this.setState({ portfolioToEdit: portfolioItem });
  };

  handleDeleteClick = async (portfolioItem) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${portfolioItem.name}"?`
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `https://juanito.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
          { withCredentials: true }
        );
        this.setState((prevState) => ({
          portfolioItems: prevState.portfolioItems.filter(
            (item) => item.id !== portfolioItem.id
          ),
        }));
      } catch (error) {
        console.error("Error deleting portfolio item:", error);
      }
    }
  };

  clearPortfolioToEdit = () => {
    this.setState({ portfolioToEdit: {} });
  };

  handleFormSubmissionError = (error) => {
    console.error("Form submission error:", error);
  };

  handleLogout = async () => {
    try {
      await axios.delete("https://juanito.devcamp.space/logout", {
        withCredentials: true,
      });
      
      window.location.href = "/inicio"; 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  render() {
    const { portfolioItems, portfolioToEdit } = this.state;

    return (
      <div className="admin-panel-wrapper">
        
        <div className="admin-header">
          <h1>Panel de Administración</h1>
          <div className="admin-user-info">
            <span>Bienvenido, Admin</span>
            <button onClick={this.handleLogout}>Salir</button>{" "}
            
          </div>
        </div>

        
        <div className="admin-content">
         
          <div className="admin-sidebar">
            <nav>
              <ul>
                <li>Gestión de Portafolio</li>
                <li>Gestión de Usuarios</li>
                <li>Configuración</li>
              </ul>
            </nav>
          </div>

          
          <div className="admin-main-content">
            <div className="portfolio-manager-wrapper">
              <div className="left-column">
                <PortfolioForm
                  handleNewFormSubmission={this.handleNewFormSubmission}
                  handleEditFormSubmission={this.handleEditFormSubmission}
                  handleFormSubmissionError={this.handleFormSubmissionError}
                  clearPortfolioToEdit={this.clearPortfolioToEdit}
                  portfolioToEdit={portfolioToEdit}
                />
              </div>

              <div className="right-column">
                <PortfolioSidebarList
                  handleDeleteClick={this.handleDeleteClick}
                  data={portfolioItems}
                  handleEditClick={this.handleEditClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
