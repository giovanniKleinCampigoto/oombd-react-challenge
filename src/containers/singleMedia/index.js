import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '../../components/general/button';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 15px;
    min-height: 80vh;
    flex-wrap: wrap;
    @media only screen and (min-width: 768px) {
        flex-wrap: nowrap;
    }
`

const EmptyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    min-height: 80vh;
`

const SingleMediaWrapper = styled.div`
    padding: 15px;
    color: white;
    max-width: 603px;
    @media only screen and (min-width: 768px) {
        padding: 0 15px;
    }
`

const MediaTitle = styled.h1`    
    margin: 0;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
`

const TitleWrapper = styled.span`
`

const Runtime = styled.span`
    margin-left: 5px;
    font-size: 0.7em;
`

const GeneralInfo = styled.p`
    margin: 10px 0;
    font-size: 0.8em;
`

const GeneralInfoWrapper = styled.div`
    @media only screen and (min-width: 768px) {
        columns: 2;
    }
`

const MediaPoster = styled.img`
    max-width: 330px;
    max-height: 445px;
`

const Plot = styled.p`
`

const Label = styled.label`
    margin: 10px 0;
    font-size: 0.8em;
    color: white;
`

const ImdbRating = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.background ? props.background : '#ccc'};
    height: 50px;
    min-width: 50px;
    border-radius: 50%;
`

const BackButton = styled(Button)`
    margin-top: 30px;
`

const ErrorMsg = styled.p`
    color: white;
    font-size: 1.2em;
    font-weight: bold;
`
const scale = (value) => {
    const rounded = Math.ceil(value)

    if  (rounded <= 3) {
        return 'rgb(255, 68, 0)';
    } else if (rounded <= 6) {
        return 'rgb(255,200,0)';
    } else {
        return 'rgb(100, 255, 50)';
    }
}

const TrailerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TrailerSeparator = styled.label`
    margin: 15px;
    width: 100%;
    color: white;
    font-size: 1em;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
`

const EmbededIFrame = styled.div`
    iframe {
        max-width: 330px;
        @media only screen and (min-width: 1024px) {
            max-width: 600px;
        }
    }
`
const SingleMedia = ({ mediaReducer, history }) => (
    (Object.values(mediaReducer.singleMedia).length && mediaReducer.singleMedia.Response !== "False") ?
    (
        <Wrapper id="single-media">
            <div>
                <MediaPoster src={mediaReducer.singleMedia.Poster} />
            </div>
            <SingleMediaWrapper>
                <MediaTitle>
                    <TitleWrapper>
                        {mediaReducer.singleMedia.Title}
                        <Runtime>({mediaReducer.singleMedia.Runtime})</Runtime>
                    </TitleWrapper>
                    <ImdbRating background={scale(mediaReducer.singleMedia.imdbRating)}>{mediaReducer.singleMedia.imdbRating}</ImdbRating>
                </MediaTitle>
                <GeneralInfo>Genre: {mediaReducer.singleMedia.Genre}</GeneralInfo>
                <Label>Plot:</Label>
                <Plot>{mediaReducer.singleMedia.Plot}</Plot>
                <GeneralInfoWrapper>
                    <GeneralInfo>Director: {mediaReducer.singleMedia.Director}</GeneralInfo>
                    <GeneralInfo>Released: {mediaReducer.singleMedia.Released}</GeneralInfo>
                    <GeneralInfo>Awards: {mediaReducer.singleMedia.Awards}</GeneralInfo>
                    <Label>'Writer:</Label>
                    <GeneralInfo>{mediaReducer.singleMedia.Writer}</GeneralInfo>
                    <Label>Actors:</Label>
                    <GeneralInfo>{mediaReducer.singleMedia.Actors}</GeneralInfo>
                    <Label>Country:</Label>
                    <GeneralInfo>{mediaReducer.singleMedia.Country}</GeneralInfo>
                    <Label>Language:</Label>
                    <GeneralInfo>{mediaReducer.singleMedia.Language}</GeneralInfo>
                    <Label>BoxOffice:</Label>
                    <GeneralInfo>{mediaReducer.singleMedia.BoxOffice}</GeneralInfo>
                    <Label>Production:</Label>
                    <GeneralInfo>{mediaReducer.singleMedia.Production}</GeneralInfo>
                </GeneralInfoWrapper>
                <TrailerWrapper>
                    <TrailerSeparator>Trailer</TrailerSeparator>
                    <EmbededIFrame dangerouslySetInnerHTML={{__html: mediaReducer.singleMediaTrailer.player.embedHtml}}/>                    
                </TrailerWrapper>   
                <BackButton onClick={() => history.goBack()}>Back</BackButton>
            </SingleMediaWrapper>
        </Wrapper>
    )
    : 
    <EmptyWrapper>
        <ErrorMsg>{mediaReducer.singleMedia.Error ? mediaReducer.singleMedia.Error : null}</ErrorMsg>
        <BackButton onClick={() => history.goBack()}>Back</BackButton>
    </EmptyWrapper>
)

function mapStateToProps(state) {
    return {
        mediaReducer: state.media
    }
} 

export default withRouter(connect(mapStateToProps)(SingleMedia));