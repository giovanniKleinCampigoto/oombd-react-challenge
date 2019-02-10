import React, { Component } from 'react';
import styled from 'styled-components';

import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';

import Routes from '../../routes';
  
const AppWrapper = styled.section`
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Header/>
        <Routes/>
        <Footer/>
      </AppWrapper>
    )
  }
}

export default App;
