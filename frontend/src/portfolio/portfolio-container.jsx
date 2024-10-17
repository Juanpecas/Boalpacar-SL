import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "../portfolio/portfolio-item.jsx";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: [],
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    if (filter === "CLEAR_FILTERS") {
      this.getPortfolioItems();
    } else {
      this.getPortfolioItems(filter);
    }
  }

  getPortfolioItems(filter = null) {
    axios
      .get("https://juanito.devcamp.space/portfolio/portfolio_items")
      .then((response) => {
        if (filter) {
          this.setState({
            data: response.data.portfolio_items.filter((item) => {
              return item.category === filter;
            }),
          });
        } else {
          this.setState({
            data: response.data.portfolio_items,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  portfolioItems() {
    return this.state.data.map((item) => {
      return <PortfolioItem key={item.id} item={item} />;
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="homepage-wrapper">
        <div className="filter-links">
          <button className="btn" onClick={() => this.handleFilter("Coches")}>
            Coches
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("Furgonetas")}
          >
            Furgonetas
          </button>
          <button className="btn" onClick={() => this.handleFilter("Camiones")}>
            Camiones
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("Petroleo Motores")}
          >
            Petroleo Motores
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("Tapicerias")}
          >
            Tapicerias
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("Mecanica Rapida")}
          >
            Mecanica Rapida
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("CLEAR_FILTERS")}
          >
            Todos
          </button>
        </div>
        <div className="portfolio-items-wrapper">{this.portfolioItems()}</div>
      </div>
    );
  }
}
