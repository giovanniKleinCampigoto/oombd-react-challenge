import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Grid from '../../components/layout/grid';
import Movie from '../../components/dataDisplay/movie';
import Pagination from '../../components/dataDisplay/pagination';
import Button from '../../components/general/button';
import Icon from '../../components/general/icon';

import SearchMovieService from '../../services/searchMovie';
import SearchMovieTrailer from '../../services/youtubeService';

import {
    SET_CURRENT_PAGE,
    SET_PAGE_RESULTS,
    SET_SINGLE_MEDIA
} from '../../redux/media/types';

const FullListWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 15px;
    width: inherit;
`

const MediaWrapper = styled.div`
    padding: 15px 0;
    min-height: 50px;
    @media screen and (min-width: 768px) {
        padding: 0;
        columns: ${props => props.loading ? '1' : '2'};
    }
`

const MovieWrapper = styled.div`

`

const ErrorMessage = styled.p`
    text-align: center;
    color: #fff;
`

const ErrorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`

const BackButton = styled(Button)`
    align-self: center;
` 

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;  
`

const AnimationContainer = styled.span`
    margin: 0;
    padding: 0;
    width: 18px;
    display: block;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% {  transform: rotate(359deg); }
    } 
`

const InfiniteSpinner = styled(Icon)`
    color: #ccc;
    font-size: 1.1em;
`
class FullResultsPage extends Component {
    state = { 
        loadingSingleMedia: false
    }

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

    fetchMediaDetails = async (title, type) => {
        const { dispatch, history: { push } } = this.props;

        try {

            this.setState({
                loadingSingleMedia: true
            })

            const response = await SearchMovieService.searhMovieDetails(title);
            const youtubeInfo = await SearchMovieTrailer.searchMovieInfo(`${title} ${type} official trailer`);
            const youtubeVideo = await SearchMovieTrailer.getMovieVideo(youtubeInfo.data.items[0].id.videoId)

            this.setState({
                loadingSingleMedia: false
            })

            dispatch({
                type: SET_SINGLE_MEDIA.SUCCESS,
                payload: {
                    singleMedia: response.data,
                    singleMediaTrailer: youtubeVideo.data.items[0]
                }
            })
            push('/singleMedia')
        } catch(e) {
            console.error(e)
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
                <MediaWrapper loading={this.state.loadingSingleMedia}>
                    {
                        this.state.loadingSingleMedia ? 
                        (
                            <SpinnerContainer>
                                <AnimationContainer>
                                    <InfiniteSpinner icon="spinner9"/>
                                </AnimationContainer>
                            </SpinnerContainer>
                        )
                        :
                        (
                            <MovieWrapper>
                                {
                                    movies.results.map((el, index) => (
                                        <Movie
                                            onClick={() => this.fetchMediaDetails(el.Title, el.Type)}
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
                    
                </MediaWrapper>
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
                    <BackButton onClick={() => goBack()}>Back</BackButton>
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