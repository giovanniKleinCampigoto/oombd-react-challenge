import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../containers/home';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import NotFound from '../containers/notFound';
import FullResultsPage from '../containers/fullResultsPage';
import SingleMediaPage from '../containers/singleMedia';

const Routes = () => (
    <Router>
        <React.Fragment>
        <Header/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/fullList" component={FullResultsPage} />
                <Route exact path="/singleMedia" component={SingleMediaPage}/>
                <Route component={NotFound}/>
            </Switch>
        <Footer/>
        </React.Fragment>
    </Router>
)

export default Routes;