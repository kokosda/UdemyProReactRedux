import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';

import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";
import { PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage } from "../pages";

import './app.css';

import { BrowserRouter as Router, Route} from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      console.log('Switched to', Service.name);
      
      return {
        swapiService: new Service()
      };
    });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet />

              <Route path="/" render={() => <h2>Welcome to StarDB</h2>} exact />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" component={StarshipsPage} exact />
              <Route path="/starships/:id" 
                      render={({match, location, history}) => {
                        const {id} = match.params;
                        return <StarshipDetails itemId={id} />;
                      }} />
              <Route path="/login" 
                      render={() => {
                        return <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />;
                      }} />
              <Route path="/secret"
                      render={() => {
                        return <SecretPage isLoggedIn={isLoggedIn} />;
                      }} />

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
