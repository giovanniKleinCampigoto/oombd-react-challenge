
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
          <Provider store={store}>
            <Router history={history}>
              {ui}
            </Router>
          </Provider>),
      store,
      history,
    }
  }

export default render;