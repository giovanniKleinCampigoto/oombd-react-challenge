import React from 'react';
import styled from 'styled-components';

import Grid from '../../components/layout/grid'


const HomeWrapper = styled.section`
    min-height: 100vh;
`

const Home = ({props}) => (
    <Grid>
        <HomeWrapper>        
            <h1>Hommer</h1>
        </HomeWrapper>
    </Grid>    
)

export default Home;

