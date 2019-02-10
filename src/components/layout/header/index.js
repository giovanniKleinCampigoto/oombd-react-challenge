import React, { Component } from 'react';
import styled from 'styled-components';
import logo from '../../../assets/logo/logo.svg';

import SearchBar from '../../dataEntry/searchBar';
import Item from '../../dataDisplay/item';
import SearchMovieService from '../../../services/searchMovie';


const StyledHeader = styled.section`
    display: flex;
    justify-content: ${props => window.innerWidth < 1024 ? 'center' : 'flex-start'};
    align-items: center;
    maring: 0 15px;l
    width: 100vw;
    height: 70px;
    background: #000066;
`

const Clickable = styled.a`
    display: flex;
    width: 150px;
    height: 70px;
    align-items: center;
    text-decoration: none;
    color: #000;
`

const Logo = styled.img`
    width: 50px;
    height: 50px;
    color: #000;
    animation: spin 10s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% {  transform: rotate(359deg); }
    }
`
const TitleFirstPart = styled.span`
    margin: 0;
    padding: 0;
    color: #fff;
`

const TitleSecondPart = styled.span`
    margin: 0;
    padding: 0;
    color: #aaa;
`

const StyledSearchBar = styled(SearchBar)`
    display: ${window.innerWidth < 1024 ? 'none' :  'block'};
`


class Header extends Component {
    
    render() {
        return (
            <StyledHeader> 
                <Clickable href="/">
                    <Logo src={logo}/>
                    <header>
                        <TitleFirstPart>
                            OM
                        </TitleFirstPart>
                        <TitleSecondPart>
                            Db
                        </TitleSecondPart>
                    </header>
                </Clickable>
                <StyledSearchBar
                    service={SearchMovieService} />
            </StyledHeader>
        );   
    }
}

export default Header;

