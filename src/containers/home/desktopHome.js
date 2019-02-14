import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SearchMovieService from '../../services/searchMovie';


import {
    SET_INITIAL_MEDIA
} from '../../redux/media/types';

const DesktopWrapper = styled.div`
`

class DesktopHome extends Component {
    state = {  }

    componentDidMount() {
        this.fetchInitialMovies("Sherlock Holmes");
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

    render() {
        const { mediaReducer } = this.props
        return (
            <DesktopWrapper>
               
                <h1>Desk version</h1>
            </DesktopWrapper>
        );
    }
}

function mapStateToProps(state){
    return {
        mediaReducer: state.media
    }
}

export default connect(mapStateToProps)(DesktopHome);