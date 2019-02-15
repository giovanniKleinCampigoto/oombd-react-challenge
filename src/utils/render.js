
import React from 'react'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducers from '../redux/rootReducers';

import {render as rtlRender} from 'react-testing-library'

function render(
    ui,
    { initialState, store = createStore(rootReducers, initialState) } = {}
  ) {
    return {
      ...rtlRender(<Provider store={store}>{ui}</Provider>),
      store,
    }
  }

export default render;