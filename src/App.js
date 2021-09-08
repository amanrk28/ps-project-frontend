import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './Pages/HomePage';
import CheckoutPage from './Pages/CheckoutPage';
import Header from './Components/common/Header/Header';

const App = () => {
  return (
    <Router>
      {/*
          Routes outside switch will render as soon as first path is matched.
          Useful for rendering components like headers or sidebars.
      */}
      <Route path="/" component={Header} />
      <Switch>
        {/*
            Routes inside switch will render if and only if the complete path is matched.
        */}
        <Route path="/" component={HomePage} exact />
        <Route path="/checkout" component={CheckoutPage} />
      </Switch>
    </Router>
  );
};

export default App;
