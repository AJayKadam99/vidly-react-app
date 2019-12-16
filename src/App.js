import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/Movies";
import "./App.css";
import Navbar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Movie from "./components/movieForm";
import LoginForm from "./components/login";
import Register from "./components/register";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={Register} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/movies/:id" render={props => <Movie {...props} />} />
            <Route path="/movies/" component={Movies} />
            <Redirect from="/" exact to="/movies" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
