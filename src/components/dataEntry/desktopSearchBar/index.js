import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { FETCH_MOVIES } from '../../../redux/media/types' ;

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

const More = styled.a`   
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
        // Maybe bad?
        setTimeout(() => {
            this.setState({
                shrink: true,
                hideBox: true
            })
        }, 300)        
    }
    
    debounce (value) {        
        // Need to improve...
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.search(value)
        }, 1000);
    }

    pushToFullList = () => {
        const { history: { push }} = this.props
        push('/fullList');        
    }

    search = async (value) => {  
        const { props: { service, dispatch }, props, state: { previousSearch } } = this;


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
            }, () => {
                dispatch({
                    type: FETCH_MOVIES.SUCCESS,
                    payload: {
                        results: response.data.Search,
                        totalResults: this.state.totalResults,
                        pages: Math.floor(this.state.totalResults / 10),
                        currentTerm: value
                    }
                })
            });
        } catch (e) {
            this.setState({
                loading: false,
                noResultsFound: true,
                errorMessage: e.message
            }, () => {
                dispatch({
                    type: FETCH_MOVIES.FAILURE,
                    payload: {
                       error: e.message
                    }
                })
            })
            console.error(e);
        }
    }

    renderResultBox () {
    
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
                        <More onClick={this.pushToFullList}>See the full list!</More>
                    </LinkWrapper>
                </ResultBox>
            )
        }
    }

    renderItem = () => this.state.movies.map((element, index) => (
        <Item 
            onClick={() => console.log(element)}
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

export default withRouter(connect(null)(DesktopSearchBar));
