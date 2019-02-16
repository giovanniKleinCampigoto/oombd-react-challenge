import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;    
    align-items: center;
    padding: 5px;   
`

const Image = styled.img` 
    width: 100px;
    height: 125px;
`

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    min-height: 175px;
    background: #000038;
    padding: 15px;
    width: 100%;
    cursor: pointer;
`

const Description = styled.div`
    display: flex;
    flex-direction: column;
    width: inherit;
    padding: 0 15px;
`

const MovieTitle = styled.p`
    margin: 0;
    font-size: 1em;
    color: white;
    font-weight: bold;
`

const Type = styled.p`
    margin: 0;
    margin-top: 5px;
    font-size: 0.9em;
    color: #fff;
`

const Year = styled.p`
    margin: 0;
    margin-top: 5px;
    font-size: 0.9em;
    color: #fff;
`

const Movie = ({ className, name, img, year, onClick, type }) => (
    <ItemWrapper className={className}>
        <DescriptionWrapper data-testid="movie" onClick={onClick}>
            {img !== 'N/A' ? <Image src={img} alt={name}/> : null}
            <Description>
                <MovieTitle>{name}</MovieTitle>
                <Type>{type}</Type>
                <Year>{year}</Year>
            </Description>
        </DescriptionWrapper>
    </ItemWrapper>
)

export default Movie;