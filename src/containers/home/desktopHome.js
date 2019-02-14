import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import Icon from '../../components/general/icon';

import Movie from '../../components/dataDisplay/movie';

import SearchMovieService from '../../services/searchMovie';
import SearchMovieTrailer from '../../services/youtubeService';


import {
    SET_INITIAL_MEDIA,
    SET_SINGLE_MEDIA
} from '../../redux/media/types';

const DesktopWrapper = styled.div`
    color: white;
`

const Title = styled.h1`
    font-size: 1.5em;   
    border-bottom: 1px solid #ccc;
`

const MediaWrapper = styled.div`
    columns: 2;
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



class DesktopHome extends Component {
    state = { 
        loadingSingleMedia: false
     }

    componentDidMount() {
        const { props: { mediaReducer } } = this

        if(!mediaReducer.initialMedia.length) {
            this.fetchInitialMovies("Sherlock Holmes");
        }
    }

    fetchInitialMovies = async keyword => {
        const { dispatch } = this.props
        try {
            const response = await SearchMovieService.searchMovie(keyword);

            dispatch({
                type: SET_INITIAL_MEDIA.SUCCESS,
                payload: {
                    initialMedia: response.data.Search
                }
            })
            
        } catch(e) {
            console.error(e);
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

    renderSugestedMedia = () => this.props.mediaReducer.initialMedia.map((el, index) => (
        <Movie
            onClick={() => this.fetchMediaDetails(el.Title, el.Type)}
            key={index}
            img={el.Poster}
            name={el.Title}
            type={el.Type}
            year={el.Year}/>
    ))

    render() {
        return (
            <DesktopWrapper>
                
                {this.state.loadingSingleMedia ?
                    (
                        <SpinnerContainer>
                            <AnimationContainer>
                                <InfiniteSpinner icon="spinner9"/>
                            </AnimationContainer>
                        </SpinnerContainer>
                    )
                    :
                    (
                        <React.Fragment>
                            <Title>My Personal Sugestion</Title>
                            <MediaWrapper>
                                {this.renderSugestedMedia()}                    
                            </MediaWrapper>
                        </React.Fragment>
                    )
                }
                
            </DesktopWrapper>
        );
    }
}

function mapStateToProps(state){
    return {
        mediaReducer: state.media
    }
}

export default withRouter(connect(mapStateToProps)(DesktopHome));