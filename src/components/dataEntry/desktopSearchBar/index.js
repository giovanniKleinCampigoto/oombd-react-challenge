import React, { Component } from 'react';
import styled from 'styled-components';

import Input from '../input';
import Icon from '../../general/icon';
import Item from '../../dataDisplay/item';

const SearchBarWrapper = styled.div`
    position: relative;
    width: ${props => props.width ? props.width : '125px' };
    transition: width .5s ease-in-out;
`
const SearchIcon = styled(Icon)`
    position: absolute;
    top: 10px;
    right: 25px;
    color: #ccc;
    font-size: 1.1em;
`
const SearchBarInput = styled(Input)`
    width: ${props => props.width ? props.width : '70px'};
    transition: width .5s ease-in-out;    
`

const InfiniteSpinner = styled(Icon)`
    position: absolute;
    top: 10px;
    right: 25px;
    color: #ccc;
    font-size: 1.1em;
    animation: spin 2s linear infinite;
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

class DesktopSearchBar extends Component {
    state = { 
        shrink: true,
        previousSearch: "",
        loading: false,
        noResultsFound: false,
        hideBox: true,
        errorMessage: "",
        totalResults: "",
        movies: []
    }

    increaseSize () {
        this.setState({
            shrink: false,
            hideBox: false
        })
    }

    decreaseSize () {
        this.setState({
            shrink: true,
            hideBox: true
        })
    }

    
    debounce (value) {        
        // Need to improve...
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.search(value)
        }, 1000);
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
            return
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

            this.setState({
                previousSearch: value,
                loading: false,
                movies: Array.isArray(response.data.Search) ? response.data.Search.slice(0, 5) : [response.data.Search],
                totalResults: response.data.totalResults
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

    renderResultBox = () => {

        if (this.state.noResultsFound) {
            return  (
                <ResultBox hide={this.state.hideBox}>
                    <NotFound>{this.state.errorMessage}</NotFound>
                </ResultBox>
            )
            
        }
        else if(this.state.movies.length) {
            
            return (
                <ResultBox hide={this.state.hideBox}>                
                    {this.renderItem()}
                    <LinkWrapper>
                        <AndMore>And more {this.state.totalResults}...</AndMore>
                        <More>See the full list!</More>
                    </LinkWrapper>
                </ResultBox>
            )
        }
    }

    renderItem = () => this.state.movies.map((element, index) => (
        <Item 
            name={element.Title}
            year={element.Year}
            img={element.Poster}
            key={index}/>
    ))

    render() {
        const { shrink } = this.state;

        return (
            <SearchBarWrapper className={this.props.className} width={shrink ? '125px' : '290px'}>
                <SearchBarInput
                    width={shrink ? '90px' : '270px'}
                    placeholder="Search..."
                    onKeyUp={e => this.debounce(e.target.value)}
                    onFocus={() => this.increaseSize()}
                    onBlur={() => this.decreaseSize()}/>
                {this.state.loading ? <InfiniteSpinner icon="spinner9"/> : <SearchIcon icon="search"/>}                
                {this.renderResultBox()}
            </SearchBarWrapper>
        );
    }
}

export default DesktopSearchBar;
