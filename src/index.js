import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import Root from './containers/Root'
import rootReducer from './reducers';

import { Provider } from 'react-redux';
import {
    getParcels, getEtats, getEssences, getTypes, getConstants, getFiledParcels, getTarifs,
    checkIntegrityThunk
} from "./thunks/data";
import * as firebase from 'firebase';
function configureStore(database) {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk.withExtraArgument(database));

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  middleware.push(logger);

  // Redux DevTools Configuration
  const actionCreators = {};
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, enhancer);

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
// const store = configureStore({});
// getParcels(store);
// getFiledParcels(store);
// getEtats(store);
// getEssences(store);
// getTypes(store);
// getConstants(store);
// getTarifs(store);
//
// const rootEl = document.getElementById('root');
// const render = Component => {
//     ReactDOM.render(
//         <AppContainer>
//           <Provider store={store}>
//               <Root />
//           </Provider>
//         </AppContainer>,rootEl)
// };

// render(Root);

if (module.hot) {

    // when running dev serveer 'npm run dev'
    firebase.initializeApp(   {
        apiKey: "AIzaSyAJrxRDiqgS-gClf4KBNiYUhG_NnJocuhw",
        authDomain: "notice-46220.firebaseapp.com",
        databaseURL: "https://notice-46220.firebaseio.com",
        projectId: "notice-46220",
        storageBucket: "notice-46220.appspot.com",
        messagingSenderId: "94269562342"
    });

    const database = firebase.database();
    const store = configureStore(database);
    store.dispatch(checkIntegrityThunk());
    const rootEl = document.getElementById('root');
    const render = Component => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <Root />
                </Provider>
            </AppContainer>,rootEl)
    };

    render(Root);
    // Require the new version and render it instead
    module.hot.accept('./containers/Root', function () {

        // Require the new version and render it instead
        const NextApp = require('./containers/Root');
        ReactDOM.render(<NextApp />, rootEl)
    })
}

// when running 'npm run prog'

global.MartelApp = global.MartelApp || {
    initApp : (config)=> {
        firebase.initializeApp(config);

        const database = firebase.database();
        const store = configureStore(database);
        store.dispatch(checkIntegrityThunk());
        const rootEl = document.getElementById('root');
        const render = Component => {
            ReactDOM.render(
                <AppContainer>
                    <Provider store={store}>
                        <Root />
                    </Provider>
                </AppContainer>,rootEl)
        };

        render(Root);

    }

    }