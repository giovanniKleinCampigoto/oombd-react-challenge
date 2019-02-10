import React, { Component } from 'react';
import styled from 'styled-components';

import MobileSearchBar  from '../../components/dataEntry/mobileSearchBar';
import Movie from '../../components/dataDisplay/movie';

import SearchMovieService from '../../services/searchMovie';

const MobileWrapper = styled.section`
    max-width: inherit;
`

const MediaWrapper = styled.div`
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
                error: val.error
            })
        } else {
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
                                name={el.Title}/>
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
                    <MediaWrapper>
                        {this.renderMovies()}
                    </MediaWrapper>
            </MobileWrapper>
        );
    }
}

export default MobileHome;