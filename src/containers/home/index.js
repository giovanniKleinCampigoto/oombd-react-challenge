import React, { Component } from 'react';
import styled from 'styled-components';

import Grid from '../../components/layout/grid';
import MobileSearchBar  from '../../components/dataEntry/mobileSearchBar';

import SearchMovieService from '../../services/searchMovie';

const HomeWrapper = styled.section`
    min-height: 100vh;
    width: inherit;
    padding: 15px;
`
class Home extends Component {
    state = {  }

    render() {
        return (
            <Grid>
                <HomeWrapper>        
                    <MobileSearchBar
                        service={SearchMovieService}/>
                </HomeWrapper>
            </Grid>                
        );
    }
}

export default Home;

