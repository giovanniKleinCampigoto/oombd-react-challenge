import React from 'react';
import {  Switch, Route } from 'react-router-dom';

import Home from '../containers/home';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import NotFound from '../containers/notFound';
import FullResultsPage from '../containers/fullResultsPage';
import SingleMediaPage from '../containers/singleMedia';
import About from '../containers/about';

const Routes = () => (
    <React.Fragment>
        <Header/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/fullList" component={FullResultsPage} />
                <Route exact path="/singleMedia" component={SingleMediaPage}/>
                <Route exact path="/about" component={About}/>
                <Route component={NotFound}/>
            </Switch>
        <Footer/>
    </React.Fragment>
)

export default Routes;