import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../containers/home';
import NotFound from '../containers/notFound';
import FullResultsPage from '../containers/fullResultsPage';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/fullList" component={FullResultsPage} />
            <Route component={NotFound}/>
        </Switch>
    </Router>
)

export default Routes;