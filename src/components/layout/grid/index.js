import React from 'react';
import styled from "styled-components"

const GridComponent = styled.section`
margin: 0 auto;
min-height: 100vh;
justify-content: center;
display: flex;
width: ${props => {
    switch(props.size) {
        case "sm":
            return "360px";
        case "md":
            return "768px";
        case "lg":
            return "1024px";
        default:
            return "1024px";
    }
}}
`;

function screenSize() {
    switch(true)	 {
        case window.innerWidth <= 360:
            return "sm"
        case (window.innerWidth > 360 && window.innerWidth <= 1024):
            return "md"
        case window.innerWidth >= 1024:
            return "lg"
        default:
            return "lg"
    }
}

const Grid = props => (
    <GridComponent size={screenSize()}>
        {props.children}
    </GridComponent>
)

export default Grid;