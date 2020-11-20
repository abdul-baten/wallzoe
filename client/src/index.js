import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import { client } from './graphql'

import {
  generalReducer,
  schedulerReducer,
  authenticationReducer,
  socialAccountsReducer,
  photoEditorReducer,
  postReducer,
  projectReducer
} from './store/reducers'

import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  general: generalReducer,
  scheduler: schedulerReducer,
  auth: authenticationReducer,
  socialAccount: socialAccountsReducer,
  photoEditor: photoEditorReducer,
  post: postReducer,
  project: projectReducer
})

const store = createStore(reducers, composeEnhancers())

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
