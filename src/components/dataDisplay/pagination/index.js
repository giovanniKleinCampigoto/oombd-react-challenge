import React, { Component } from 'react';
import styled from 'styled-components';

import Icon from '../../general/icon';
import Input from '../../dataEntry/input';

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 50px;
    padding: 15px;
    margin-bottom: 30px;
`

const PageNumbers = styled.span`
    display: block;
    margin-top: 5px;
    color: white;
`

const Arrow = styled(Icon)`
    padding: 10px;
    color: white;
    cursor: pointer;
    font-size: 1.5em;
`

const LeftArrow = styled(Arrow)`
    display: inline-block;
    transform: rotate(180deg);
`

const InputWrapper = styled.div`
`

class Pagination extends Component {
    state = {  }

    debounce (value) {        
        // Need to improve...
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.search(value)
        }, 1000);
    }

    search = value => {
        const { nextPage, currentPage } = this.props
        
        if(value < 1 || value > this.props.totalPageNumber || value === currentPage) return

        console.log(value)

        nextPage(value)
    }

    render() {
        const { currentPage, totalPageNumber, previousPage, nextPage } = this.props
        return (
        <PaginationWrapper>
            <InputWrapper>
                <LeftArrow icon="play3" onClick={() => previousPage(currentPage - 1  === 0 ? 1 : currentPage - 1)}/>
                    <Input 
                        onChange={e => this.debounce(e.target.value)}/>
                <Arrow icon="play3" onClick={() => nextPage(currentPage + 1  > totalPageNumber ? totalPageNumber : currentPage + 1)}/>
            </InputWrapper>
            <PageNumbers>{`${currentPage} of ${totalPageNumber}`}</PageNumbers>
        </PaginationWrapper>        
        );
    }
}

export default Pagination;