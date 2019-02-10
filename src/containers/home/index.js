import React, { Component } from 'react';
import styled from 'styled-components';

import Grid from '../../components/layout/grid';


import DesktopHome from './desktopHome';
import MobileHome from './mobileHome';

const HomeWrapper = styled.section`
    min-height: 100vh;
    width: inherit;
    padding: 15px;
`
class Home extends Component {
    state = {  }

    decideHomeRender () {
        if(window.innerWidth > 1024) {
            return <DesktopHome/>
        } else {
            return <MobileHome/>
        }
    }

    render() {
        return (
            <Grid>
                <HomeWrapper>        
                    {this.decideHomeRender()}
                </HomeWrapper>
            </Grid>                
        );
    }
}

export default Home;

