import React from 'react';
import styled from 'styled-components';

import Grid from '../../components/layout/grid';
import logo from '../../assets/logo/logo.svg';
import redux from '../../assets/logo/redux.svg'

const PageTitle = styled.h1`
    font-size: 2em;
    color: white;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
`

const TestDescription = styled.div`
    color: white;
`

const Link = styled.a`
    color: white;
`
const LogoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LogoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ReactLogo = styled.img`
    width: 150px;
    height: 150px;
`

const ReduxLogo = styled.img`
    width: 100px;
    height: 100px;
`

const StyledLogo = styled.img`
    width: 100px;
    height: 100px;
`

const About = () => (
    <Grid>
        <TestDescription>
            <PageTitle>Thank You!</PageTitle>
            <p>This test was built using the <Link href="http://www.omdbapi.com/">OMDb open API</Link> and <Link href="https://developers.google.com/youtube/v3/">YouTube open API</Link></p>
            <p>Please fill in the search bar in the top of the page to search for a movie/media, every media box is clickable and will provide you a page with that media info and it's official trailer provided by the Youtube API</p>
            <p>The Main technologies used were: </p>
            <LogoContainer>
                <LogoWrapper>
                    <ReactLogo src={logo}/>
                    <span>React</span>
                </LogoWrapper> 
                <LogoWrapper>
                    <ReduxLogo src={redux}/>
                    <span>Redux</span>
                </LogoWrapper>
                <LogoWrapper>
                    <StyledLogo src='https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png'/>
                    <span>Styled Components</span>
                </LogoWrapper>
            </LogoContainer>
            <p>Please checkout <Link href="http://www.github.com/giovanniKleinCampigoto">my git repository</Link> for more cool stuff!</p>
        </TestDescription>
    </Grid>
)

export default About;