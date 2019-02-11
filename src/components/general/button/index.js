import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 10px 15px;
    background: #000066;
    color: white;
    font-size: 1em;
    border-radius: 5px;
    width: 150px;
    border-color: transparent;
    cursor: pointer;
`

const Button = ({className, children, onClick}) => (
    <StyledButton className={className} onClick={onClick}>
        {children}
    </StyledButton>
)

export default Button;