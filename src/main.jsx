import React from 'react';
import ReactDOM from 'react-dom/client';
import {ProductsApp} from './ProductsApp';
import './styles.css';
import { ApolloClient, HttpLink,InMemoryCache, ApolloProvider } from '@apollo/client';


import 'react-toastify/dist/ReactToastify.css';


import 'bootstrap/dist/css/bootstrap.css';


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
      uri: 'https://localhost:44369/api/gql'  
  }),
  connectToDevTools: true
  
});



ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <ProductsApp /> 
  </React.StrictMode>
  </ApolloProvider>,
)
