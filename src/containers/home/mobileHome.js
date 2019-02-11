import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import MobileSearchBar  from '../../components/dataEntry/mobileSearchBar';
import Movie from '../../components/dataDisplay/movie';

import SearchMovieService from '../../services/searchMovie';

import { 
    FETCH_MOVIES
} from '../../redux/media/types';
 
const MobileWrapper = styled.section`
    max-width: inherit;
`

const MediaWrapper = styled.div`
   @media only screen and (min-width: 768px) {
        columns: 2;
    }
`

const LinkWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 30px 15px;
`

const TotalResults = styled.p`
    margin: 0;
    font-size: 1em;
    color: white;
    font-weight: bold;
`

const ClickHere = styled(Link)`
    font-size: 1em;
    color: white;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
`

const MovieWrapper = styled.div`

`

const ErrorMessage = styled.p`
    text-align: center;
    color: #fff;
`

class MobileHome extends Component {
    state = { 
        movies: [],
        totalResults: "",
        error: ""
    }

    getResults = val => {

        if(val.error) {
            this.setState({
                movies: val.movies,
                error: val.error,
                totalResults: ""
            })
        } else {
            const { dispatch } = this.props

            dispatch({
                type: FETCH_MOVIES.SUCCESS,
                payload: {
                    results: val.movies,
                    totalResults: val.totalResults,
                    pages: Math.floor(val.totalResults / 10)
                }
            })

            this.setState({
                movies: val.movies,
                totalResults: val.totalResults,
                error: ""
            })
        }

    }

    renderMovies () {
        if(this.state.error.length) {
            return <ErrorMessage>{this.state.error}</ErrorMessage>
        } else {
            return (
                <MovieWrapper>
                    {
                        this.state.movies.map((el, index) => (
                            <Movie
                                key={index}
                                img={el.Poster}
                                name={el.Title}
                                type={el.Type}
                                year={el.Year}/>
                        ))
                    }
                </MovieWrapper>
            )
        }
    }
    render() {
        return (
            <MobileWrapper>
                <MobileSearchBar
                    service={SearchMovieService}
                    results={this.getResults}/>
                    <LinkWrapper>
                        <TotalResults>
                            {this.state.totalResults ? `Total Results: ${this.state.totalResults}` : null}
                        </TotalResults>
                        <ClickHere to="/fullList">
                            {this.state.totalResults ? `Full list here!` : null}                        
                        </ClickHere>
                    </LinkWrapper>
                    <MediaWrapper>
                        {this.renderMovies()}
                    </MediaWrapper>
            </MobileWrapper>
        );
    }
}

export default connect(null)(MobileHome);