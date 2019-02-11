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
    getResults = val => {
        const { dispatch } = this.props

        if(val.error) {
            dispatch({
                type: FETCH_MOVIES.FAILURE,
                payload: {
                   error: val.error
                }
            })
        } else {
        
            dispatch({
                type: FETCH_MOVIES.SUCCESS,
                payload: {
                    results: val.movies,
                    totalResults: val.totalResults,
                    pages: Math.floor(val.totalResults / 10)
                }
            })
        }

    }

    renderMovies () {
        const { mediaReducer : { movies }} = this.props

        if(movies.error.length) {
            return <ErrorMessage>{movies.error}</ErrorMessage>
        } else {
            return (
                <MovieWrapper>
                    {
                        movies.results.map((el, index) => (
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
        const { mediaReducer : { movies }} = this.props

        return (
            <MobileWrapper>
                <MobileSearchBar
                    service={SearchMovieService}
                    results={this.getResults}/>
                    <LinkWrapper>
                        <TotalResults>
                            {movies.totalResults ? `Total Results: ${movies.totalResults}` : null}
                        </TotalResults>
                        <ClickHere to="/fullList">
                            {movies.totalResults ? `Full list here!` : null}                        
                        </ClickHere>
                    </LinkWrapper>
                    <MediaWrapper>
                        {this.renderMovies()}
                    </MediaWrapper>
            </MobileWrapper>
        );
    }
}

function mapStateToProps(state) {
    return {
        mediaReducer: state.media
    }
} 

export default connect(mapStateToProps)(MobileHome);