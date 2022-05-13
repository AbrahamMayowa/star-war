import { ApolloServer, gql } from 'apollo-server';
import resolvers from '../resolvers';
import typeDefs from '../typeDef';
import request from 'supertest';


// const typeDefs = gql`
//   type Query {
//     hello(name: String): String!
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: (_, { name }) => `Hello ${name}!`,
//   },
// };

// const testServer = new ApolloServer({
//     typeDefs,
//     resolvers
//   });

// it('returns hello with the provided name', async () => {
 

//   const result = await testServer.executeOperation({
//     query: 'query SayHelloWorld($name: String) { hello(name: $name) }',
//     variables: { name: 'world' },
//   });

//   expect(result.errors).toBeUndefined();
//   expect(result.data?.hello).toBe('Hello world!');
// });

let server, url;


const testServer = new ApolloServer({
    typeDefs,
    resolvers
  });
  
it('returns list of people', async () => {
 
  const result = await testServer.executeOperation({
    query: 'query GetPeople($offset: Int) { people(offset: $offset){count} }',
    variables: { offset: 1 },
  });

  //console.log(result)

  expect(result.errors).toBeUndefined();
  expect(result.data?.hello).toBe('Hello world!');
});