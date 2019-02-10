import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    text-align: center;
    height: 150px;
    background: #ccc;
    border-top: 1px solid #aaa;

    p {
        color: #aaa;
        font-weight: bold;
    }

    a {
        text-decoration: underline;
        color: #aaa;
    }
`

const Footer = () => (
    <FooterWrapper>
        <p>A simple implementation of a react app using the OMDb API ;)</p>
        <p>Checkout <a href="http://www.github.com/giovanniKleinCampigoto">my github repo</a> for more apps!</p>
    </FooterWrapper>
)

export default Footer;