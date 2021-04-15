import React, { Component } from "react";
import axios from 'axios';
import PortfolioItem from "./portfolio-item";
export default class PortfolioContainer extends Component {
    constructor() {
        super();
    
        this.state = {
            pageTitle:"welcome to my portfolio",
            isLoading: false,
            data: [
              {title: "Capstone Project", category: "blog", slug: 'capstone project' },
              {title: "Practice Website", category: "website", slug: 'practice website' },
              {title: "What's your Spirit Animal?", category: "Quiz", slug: "what's your spirit animal" },
              {title: "Flipping Cards", category: "website", slug: "Flip the cards!" } 
              
              
            ]
        }
        this.handleFilter = this.handleFilter.bind(this);
        
    }
    
  handleFilter(filter) {
    this.setState({
        data: this.state.data.filter(item => {
            return item.category === filter;
        })
    });
  }
  getPortfolioItems() {
    axios.get('https://myrajames.devcamp.space/portfolio/portfolio_items')
    .then(response =>  {
      this.setState({
        data: response.data.portfolio_items
    });
  })
  .catch(error => {
    console.log(error);
  });
}
    portfolioItems() {
        return this.state.data.map(item => {
          return <PortfolioItem key={item.id} item={item}/>;
        });
    }
    
    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }





      return (
        <div className="portfolio-items-wrapper">

        <button className="btn" onClick={() => this.handleFilter("eCommerce")}>
          eCommerce
        </button>
        <button className="btn" onClick={() => this.handleFilter("Scheduling")}>
          Scheduling
        </button>
        <button className="btn" onClick={() => this.handleFilter("Enterprise")}>
          Enterprise
        </button>

        {this.portfolioItems()}

        </div>
      

            
        );
    }
}