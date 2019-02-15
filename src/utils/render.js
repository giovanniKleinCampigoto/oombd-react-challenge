
import React from 'react'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducers from '../redux/rootReducers';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import {render as rtlRender} from 'react-testing-library'

function render(
    ui,
    { initialState, 
      store = createStore(rootReducers, initialState),
      route = '/',
      history = createMemoryHistory({ initialEntries: [route] }), } = {}
  ) {
    return {
      ...rtlRender(
        <Router history={history}>
          <Provider store={store}>
            {ui}
          </Provider>
        </Router>),
      store,
      history,
    }
  }

export default render;