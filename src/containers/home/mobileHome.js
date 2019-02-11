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

const ErrorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`

const ErrorMessage = styled.p`
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
            return (
                <ErrorWrapper>
                    <ErrorMessage>{movies.error}</ErrorMessage>
                </ErrorWrapper>
            )
        } else {
            return (
                <MediaWrapper>
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
                </MediaWrapper>
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
                    {
                        movies.totalResults ?
                        (
                            <LinkWrapper>
                                <TotalResults>
                                    {`Total Results: ${movies.totalResults}`}
                                </TotalResults>
                                <ClickHere to="/fullList">
                                    Full list here!
                                </ClickHere>
                            </LinkWrapper>
                        )
                        : null
                    } 
                    {this.renderMovies()}
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