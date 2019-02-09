import React, { Component } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import './App.css';

import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';

import Routes from '../../routes'

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

    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
