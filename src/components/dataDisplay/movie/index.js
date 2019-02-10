import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;    
    align-items: center;
    padding: 5px;   
    border-top: 1px solid #ccc;
    :first-child {
        border-top: transparent;
    }
`

const Image = styled.img` 
    width: 100px;
    height: 125px;
`

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 15px;
    width: 100%;
    cursor: pointer;
`

const Description = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: inherit;
    padding: 0 15px;
`

const MovieTitle = styled.p`
    padding: 0 5px;
    font-size: 1em;
    color: white;
    font-weight: bold;
`

const Year = styled.p`
    font-size: 0.7em;

`

const Movie = ({ className, name, img, year, onClick }) => (
    <ItemWrapper className={className}>
        <DescriptionWrapper onClick={onClick}>
            {img ? <Image src={img} alt={name}/> : null}
            <Description>
                <MovieTitle>{name}</MovieTitle>
                <Year>{year}</Year>
            </Description>
        </DescriptionWrapper>
    </ItemWrapper>
)

export default Movie;