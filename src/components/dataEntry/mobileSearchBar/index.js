import React, { Component } from 'react';
import styled from 'styled-components';

import Input from '../input';
import Icon from '../../general/icon';

const SearchBarWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 15px;
    width: ${props => props.width ? props.width : '250px' };
    transition: width .5s ease-in-out;
`
const SearchIcon = styled(Icon)`
    position: absolute;
    top: 10px;
    right: ${props => props.shrink ? '5px' : '15px'};
    color: #ccc;
    font-size: 1.1em;
    transition: right .5s ease-in-out;
`
const SearchBarInput = styled(Input)`
    display: block;
    width: 95%;
`

const InfiniteSpinner = styled(Icon)`
    position: absolute;
    top: 10px;
    right: ${props => props.shrink ? '5px' : '15px'};
    color: #ccc;
    font-size: 1.1em;
    animation: spin 2s linear infinite;
    transition: right .5s ease-in-out;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% {  transform: rotate(359deg); }
    }
      
`

class MobileSearchBar extends Component {
    state = { 
        shrink: true,
        previousSearch: "",
        loading: false,
        movies: []
    }
    
    debounce (value) {        
        // Need to improve...
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.search(value)
        }, 1000);
    }

    increaseSize () {
        this.setState({
            shrink: false
        })
    }

    decreaseSize () {
        this.setState({
            shrink: true
        })
    }

    search = async (value) => {  
        const { props: { service }, state: { previousSearch } } = this;

        if(!value.length) {
            this.setState({
                previousSearch: "",
                loading: false,
                movies: []
            })
            return
        }

        if (value === previousSearch) return

        try {
            this.setState({
                loading: true
            })

            const response = await service.searchMovie(value);

            if(response.data.Response === "False") {
                throw new Error(response.data.Error);
            }

            const returnedObject = {
                movies: Array.isArray(response.data.Search) ? response.data.Search : [response.data.Search],
                totalResults: response.data.totalResults,
                currentTerm: value
            }

            this.setState({
                previousSearch: value,
                loading: false
            }, () => this.props.results(returnedObject));
        } catch (e) {
            this.setState({
                loading: false,
                previousSearch: ""
            }, () => this.props.results({movies: [], error: e.message }))
            console.error(e);
        }
    }

    render() {
        const { shrink } = this.state;

        return (
            <SearchBarWrapper className={this.props.className} width={shrink ? '125px' : '100%'}>
                <SearchBarInput
                    placeholder="Search..."
                    onKeyUp={e => this.debounce(e.target.value)}
                    onFocus={() => this.increaseSize()}
                    onBlur={() => this.decreaseSize()}/>
                    {this.state.loading ? <InfiniteSpinner shrink={shrink} icon="spinner9"/> : <SearchIcon shrink={shrink} icon="search"/>}                
            </SearchBarWrapper>
        );
    }
}

export default MobileSearchBar;
