import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from  "react-router-dom"
import axios from 'axios';



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
    this.handleUnsuccessfullLogin = this.handleUnsuccessfullLogin.bind(this);
    this.handleSuccessfullLogout = this.handleSuccessfullLogout.bind(this);
  }

  handleSuccessfullLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  

  handleUnsuccessfullLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleSuccessfullLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

    checkLoginStatus() {
      return axios.get("https://api.devcamp.space/logged_in", { 
        withCredentials: true 
      })
      .then(response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          })
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
    }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [<Route path="/blog-me" component={Blog} />];  
  }

  render() {
    return (
      <div className='container'>
      <Router>
          <div>
          
           <NavigaionContainer 
            loggedInStatus={this.state.loggedInStatus}
            handleSuccessfullLogout={this.handleSuccessfullLogout} 
            />

            <h2>{this.state.loggedInStatus}</h2>
            <Switch>
              <Route exact path="/" component={Home} />

              <Route 
              path="/auth" 
              render={props => (
                <Auth 
                  {...props}
                  handleSuccessfullLogin={this.handlesuccessfullLogin}
                  handleUnsuccessfullLogin={this.handleUnsuccessfullLogin}
                />
              )}
            />

              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              { this.state.loggedInStatus ==="LOGGED_IN" ? this.authorizedPages() :null}
              
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
