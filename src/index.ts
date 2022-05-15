import { ApolloServer, gql } from 'apollo-server-lambda';
import {
  swapiResolvers,
  swapiTypeDefs,
  StarWarAPI,
} from './graphql/swapi'


const server = new ApolloServer({
  typeDefs: swapiTypeDefs,
  resolvers: swapiResolvers,
  dataSources: () => {
    return {
    starwarAPI: new StarWarAPI() as any
    }
  },
});

exports.graphqlHandler = server.createHandler();