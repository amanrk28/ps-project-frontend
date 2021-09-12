import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './Pages/HomePage';
import CheckoutPage from './Pages/CheckoutPage';
import LoginPage from './Pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Switch>
        {/*
            Routes inside switch will render if and only if the complete path is matched.
        */}
        <Route path="/" component={HomePage} exact />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
