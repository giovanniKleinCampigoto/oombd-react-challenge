// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

//Stylesheets
import './index.css';
import '../src/assets/icons/icomoon/style.css'

// App container
import App from './containers/app';

import rootReducers from './redux/rootReducers';

const store = createStore(
    rootReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const rootNode = (
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(rootNode, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
