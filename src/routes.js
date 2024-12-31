// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/cart" component={Cart} />
      {/* Thêm các tuyến đường khác nếu cần */}
    </Switch>
  </Router>
);

export default Routes;
