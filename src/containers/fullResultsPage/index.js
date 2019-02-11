import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Grid from '../../components/layout/grid';
import Movie from '../../components/dataDisplay/movie';
import Pagination from '../../components/dataDisplay/pagination';
import Button from '../../components/general/button';

import SearchMovieService from '../../services/searchMovie';

import {
    SET_CURRENT_PAGE,
    SET_PAGE_RESULTS
} from '../../redux/media/types';

const FullListWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 15px;
`

const MediaWrapper = styled.div`
    padding: 15px 0;
   @media only screen and (min-width: 768px) {
        columns: 2;
    }
`

const MovieWrapper = styled.div`

`

const ErrorMessage = styled.p`
    text-align: center;
    color: #fff;
`

const BackButton = styled(Button)`
    align-self: flex-start;
` 
class FullResultsPage extends Component {
    state = {  }

    getPage = val => {
        const { dispatch, mediaReducer: { movies } } = this.props

        if(val === movies.currentPage) return

        dispatch({
            type: SET_CURRENT_PAGE.SUCCESS,
            payload: {
                currentPage: val
            }
        })

        this.fetchPage(val)
    }

    fetchPage = async (page) => {
        const { mediaReducer: { movies }, dispatch } = this.props
       
        try {

            const response = await SearchMovieService.searchMoviePage(movies.currentTerm, page);

            dispatch({
                type: SET_PAGE_RESULTS.SUCCESS,
                payload: {
                    results: response.data.Search
                }
            })
        } catch(e) {
            console.error(e)
        }
    }

    renderMovies () {
        const { mediaReducer: { movies } } = this.props

        if (movies.error.length) {
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
        const { mediaReducer: { movies }, history: { goBack } } = this.props

        return (
            <Grid>
                <FullListWrapper>
                    {!movies.results.length ? null : <Pagination nextPage={this.getPage} previousPage={this.getPage} currentPage={movies.currentPage} totalPageNumber={movies.pages}/>}
                    <MediaWrapper>
                        {this.renderMovies()}
                    </MediaWrapper>
                    {!movies.results.length ? null : <BackButton onClick={() => goBack()}>Back</BackButton>}                    
                </FullListWrapper>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        mediaReducer: state.media
    }
} 

export default withRouter(connect(mapStateToProps)(FullResultsPage));