import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client'
import './index.css'
import {Provider} from 'react-redux'
import { Store } from './app/Store.jsx'
const client =new ApolloClient({
  uri:"https://test.api.shop.strackit.com/graphql/",
  cache: new InMemoryCache()
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ApolloProvider client={client}>
      <Provider store={Store}>
      <App />
      </Provider>
    
     </ApolloProvider>
    
  </StrictMode>,
)
