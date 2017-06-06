import React, { Component } from 'react';
import { View, StatusBar, Text } from 'react-native';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';
import RootScreen from './RootScreen';

const GRAPHQL_API =
  'https://api.graph.cool/simple/v1/cj3g3v2hp18ag01621354vr2y';

const networkInterface = createNetworkInterface({ uri: GRAPHQL_API });
const client = new ApolloClient({ networkInterface });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootScreen />
      </ApolloProvider>
    );
  }
}

export default App;
