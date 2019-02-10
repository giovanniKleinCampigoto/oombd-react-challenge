import React, { Component } from 'react';
import styled from 'styled-components';

import Input from '../input';
import Icon from '../../general/icon';
import Item from '../../dataDisplay/item';

const SearchBarWrapper = styled.div`
    position: relative;
    width: ${props => props.width ? props.width : '250px' };
    transition: width 1.5s ease-in-out;
`
const SearchIcon = styled(Icon)`
    position: absolute;
    top: 10px;
    right: ${props => props.shrink ? '5px' : '30px'};
    color: #ccc;
    font-size: 1.1em;
    transition: right 1.5s ease-in-out;
`
const SearchBarInput = styled(Input)`
    display: block;
    width: 95%;
`

const InfiniteSpinner = styled(Icon)`
    position: absolute;
    top: 10px;
    right: ${props => props.shrink ? '5px' : '30px'};
    color: #ccc;
    font-size: 1.1em;
    animation: spin 2s linear infinite;
    transition: right 1.5s ease-in-out;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% {  transform: rotate(359deg); }
    }
      
`

const ResultBox = styled.div`
    display: ${props => props.hide ? 'none' : 'block' };
    position: absolute;
    margin-top: 3px;
    padding: 15px;
    border-radius: 5px;
    background: #fff;
    width: 350px;
    border: 1px solid #ccc;
`

const NotFound = styled.div`
    color: #000;
`

const LinkWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-top: 15px;
    font-size: 0.8em;
`

const More = styled.span`   
    text-decoration: underline;
    cursor: pointer;
`

const AndMore = styled.span`
    color: #333;
`

class MobileSearchBar extends Component {
    state = { 
        shrink: true,
        previousSearch: "",
        loading: false,
        noResultsFound: false,
        errorMessage: "",
        totalResults: "",
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
        const { props: { service }, props, state: { previousSearch } } = this;


        if(!value.length) {
            this.setState({
                previousSearch: "",
                loading: false,
                noResultsFound: false,
                errorMessage: "",
                movies: []
            })
        }

        if (value === previousSearch) return

        try {
            this.setState({
                loading: true,
                noResultsFound: false
            })

            const response = await service.searchMovie(value);

            if(response.data.Response === "False") {
                throw new Error(response.data.Error);
            }

            const returnedObject = {
                movies: Array.isArray(response.data.Search) ? response.data.Search.slice(0, 5) : [response.data.Search],
                totalResults: response.data.totalResults
            }

            this.setState({
                previousSearch: value,
                loading: false
            });
        } catch (e) {
            this.setState({
                loading: false,
                noResultsFound: true,
                errorMessage: e.message
            })
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
