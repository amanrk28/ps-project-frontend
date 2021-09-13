import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.scss';
import HomePage from './Pages/HomePage';
import CheckoutPage from './Pages/CheckoutPage';
import LoginPage from './Pages/LoginPage';

const App = () => {
  return (
    <div style={{ position: 'relative' }}>
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
      <ToastContainer />
    </div>
  );
};

export default App;
