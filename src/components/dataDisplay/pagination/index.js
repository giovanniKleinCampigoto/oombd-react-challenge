import React, { Component } from 'react';
import styled from 'styled-components';

import Icon from '../../general/icon';

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 300px;
    height: 50px;
    padding: 15px;
`

const PageNumbers = styled.span`
    color: white;
`

const Arrow = styled(Icon)`
    padding: 10px;
    color: white;
    cursor: pointer;
    font-size: 1.5em;
`

const LeftArrow = styled(Arrow)`
    transform: rotate(180deg);
`

const Pagination = ({ currentPage, totalPageNumber }) => (
    <PaginationWrapper>
        <LeftArrow icon="play3"/>
            <PageNumbers>{`${currentPage} of ${totalPageNumber}`}</PageNumbers>
        <Arrow icon="play3"/>
    </PaginationWrapper>
)

export default Pagination;