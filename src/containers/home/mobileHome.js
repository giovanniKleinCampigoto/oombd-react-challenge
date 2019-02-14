import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MobileSearchBar  from '../../components/dataEntry/mobileSearchBar';
import Movie from '../../components/dataDisplay/movie';
import Icon from '../../components/general/icon';

import SearchMovieService from '../../services/searchMovie';

import { 
    FETCH_MOVIES,
    SET_SINGLE_MEDIA
} from '../../redux/media/types';
import SearchMovieTrailer from '../../services/youtubeService';
 
const MobileWrapper = styled.section`
    max-width: inherit;
`

const MediaWrapper = styled.div`
   @media only screen and (min-width: 768px) {
        columns: ${props => props.loading ? '1' : '2'};
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

class MobileHome extends Component {
    state = {
        loadingSingleMedia: false
    }

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
                    pages: Math.floor(val.totalResults / 10),
                    currentTerm: val.currentTerm
                }
            })
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
        const { mediaReducer : { movies }} = this.props

        return (
            <MobileWrapper>
                <MobileSearchBar
                    service={SearchMovieService}
                    results={this.getResults}/>
                    {
                        movies.totalResults && !this.state.loadingSingleMedia ?
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

export default withRouter(connect(mapStateToProps)(MobileHome));