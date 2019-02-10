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
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 85%;
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
    font-size: .9em;
    font-weight: bold;
`

const Year = styled.p`
    font-size: 0.7em;

`

const Item = ({ className, name, img, year, onClick }) => (
    <ItemWrapper className={className}>
        {img ? <Image src={img} alt={name}/> : null}
        <DescriptionWrapper onClick={onClick}>
            <Description>
                <MovieTitle>{name}</MovieTitle>
                <Year>{year}</Year>
            </Description>
        </DescriptionWrapper>
    </ItemWrapper>
)

export default Item;