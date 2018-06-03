import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import Root from './containers/Root'
import rootReducer from './reducers';

import { Provider } from 'react-redux';
import {getParcels, getEtats, getEssences, getTypes, getConstants, getFiledParcels, getTarifs} from "./thunks/data";

function configureStore() {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk.withExtraArgument());

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
const store = configureStore();
getParcels(store);
getFiledParcels(store);
getEtats(store);
getEssences(store);
getTypes(store);
getConstants(store);
getTarifs(store);

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

if (module.hot) {
    // Require the new version and render it instead
    module.hot.accept('./containers/Root', function () {
        // Require the new version and render it instead
        const NextApp = require('./containers/Root');
        ReactDOM.render(<NextApp />, rootEl)
    })
}
