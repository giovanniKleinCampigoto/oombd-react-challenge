import React, { Component } from 'react';
import styled from 'styled-components';


import Routes from '../../routes';
  
const AppWrapper = styled.section`
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Routes/>
      </AppWrapper>
    )
  }
}

export default App;
