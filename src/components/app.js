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
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleSuccessfullLogin = this.handleSuccessfullLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);
  }

  handleSuccessfullLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnSuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  render() {
    return (
      <div className='container'>
      <Router>
          <div>
          
           <NavigaionContainer />
            <Switch>
              <Route exact path="/" component={Home} />

              <Route 
              path="/auth" 
              render={props => (
                <Auth 
                  {...props}
                  handleSuccessfullLogin={this.handleSuccessfullLogin}
                  handleUnSuccessfulLogin={this.handleUnSuccessfulLogin}
                />
              )}
            />

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
