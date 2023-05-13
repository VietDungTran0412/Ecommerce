import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './state'
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = configureStore({
  reducer: {cart: cartReducer}
}, composeWithDevTools())



const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  </ApolloProvider>

);


