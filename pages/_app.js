import Head from 'next/head'
import '../styles/globals.css';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const wsLink = process.browser ? new WebSocketLink({ // if you instantiate in the server, the error will be thrown
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
}) : null;

const httplink = new HttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'same-origin'
});

const link = process.browser ? split( //only create the split in the browser
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httplink,
) : httplink;

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

function MyApp({Component, pageProps}) {
  return (
    
    <ApolloProvider client={client}>
      <Head>
        <title>Pigeon</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
