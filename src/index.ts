import { ApolloServer, gql } from 'apollo-server-lambda';
import {
  swapiResolvers,
  swapiTypeDefs,
} from './graphql/swapi'


const server = new ApolloServer({
  typeDefs: swapiTypeDefs,
  resolvers: swapiResolvers,
});

exports.graphqlHandler = server.createHandler();