import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from  "react-router-dom"


import NavigaionContainer from "./navigation/navigation-container";
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import PortfolioDetail from './pages/portfolio/portfolio-detail';
import Auth from "./pages/auth";
import noMatch from "./pages/noMatch";

export default class App extends Component {
  render() {
    return (
      <div className='container'>
      <Router>
          <div>
          
            <NavigaionContainer />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/auth" component={Auth} />
              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog-me" component={Blog} />
              <Route 
                exact 
                path="/portfolio/:slug" 
                component={PortfolioDetail} 
              />
              <Route component={noMatch} />
              
            </Switch>
          </div>
      </Router>
        
        
        
      </div>
    );
  }
}
