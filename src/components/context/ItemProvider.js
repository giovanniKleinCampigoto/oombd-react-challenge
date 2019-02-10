import React, { Component } from 'react';
import { ItemContext } from './ItemContext'

class ItemProvider extends Component {
    state = {
        currentArtist: [],
        currentArtistAlbums: [],
        returnedMusicResults: {
            results: []
        },
        returnedArtistResults: {
            results: []
        },
        relatedArtists: {
            results: []
        }
    }

    // Artist Page Related
    pushCurrentArtist = value => {
        this.setState({
            currentArtist: value
        })
    }

    pushCurrentArtistAlbums = value => {
        this.setState({
            currentArtistAlbums: value
        })
    }

    pushRelatedArtists = value => {
        this.setState({
            relatedArtists: value
        })
    }

    // Maing Page Related
    pushArtistResults = (value) => {
        this.setState({
            returnedArtistResults: value
        })
    }

    pushMusicResults = (value) => {
        this.setState({
            returnedMusicResults: value
        })
    }

    render() {
        const value = {
            ...this.state, 
            pushCurrentArtist: this.pushCurrentArtist,
            pushArtistResults: this.pushArtistResults,
            pushMusicResults: this.pushMusicResults,
            pushRelatedArtists: this.pushRelatedArtists,
            pushCurrentArtistAlbums: this. pushCurrentArtistAlbums            
        }

        return (
            <ItemContext.Provider value={value}>
                {this.props.children}
            </ItemContext.Provider>
        )
    }
}


export default ItemProvider;