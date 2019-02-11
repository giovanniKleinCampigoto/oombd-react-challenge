import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const SingleMediaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    min-height: 100vh;
    color: white;
`

const MediaTitle = styled.h1`    
    font-weight: bold;
`

const Rated = styled.span`
`

const Runtime = styled.span`
    margin-left: 5px;
    font-size: 0.7em;
`

const Released = styled.p`
    font-size: 0.8em;
`

const MediaPoster = styled.img`
`

const Plot = styled.p`
`

const SingleMedia = ({ mediaReducer }) => (
    <SingleMediaWrapper>
        <MediaPoster src={mediaReducer.singleMedia.Poster} />
        <MediaTitle>{mediaReducer.singleMedia.Title}<Runtime>{mediaReducer.singleMedia.Runtime ? `(${mediaReducer.singleMedia.Runtime})` : null}</Runtime></MediaTitle>
        <Released>{mediaReducer.singleMedia.Released ? `Released: ${mediaReducer.singleMedia.Released}`: null}</Released>
        <Plot>{mediaReducer.singleMedia.Plot}</Plot>
    </SingleMediaWrapper>
)

function mapStateToProps(state) {
    return {
        mediaReducer: state.media
    }
} 

export default connect(mapStateToProps)(SingleMedia);