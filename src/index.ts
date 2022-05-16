import { ApolloServer, gql } from 'apollo-server-lambda';
import {
  swapiResolvers,
  swapiTypeDefs,
  StarWarAPI,
} from './graphql/swapi'
import { BaseRedisCache } from 'apollo-server-cache-redis';
import Redis from 'ioredis';



const server = new ApolloServer({
  typeDefs: swapiTypeDefs,
  resolvers: swapiResolvers,
  cache: new BaseRedisCache({
    client: new Redis('redis://:p79d0d101f4ed8e9c309ddb2eb9c0de1c8abc8ba5242ef75d84c3d4c159931778@ec2-52-5-132-2.compute-1.amazonaws.com:9980', {
      tls: {
          rejectUnauthorized: false
      }
  }),
  }),
  dataSources: () => {
    return {
    starwarAPI: new StarWarAPI() as any
    }
  },
});

exports.graphqlHandler = server.createHandler();