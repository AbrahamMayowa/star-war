import { ApolloServer } from "apollo-server";
import resolvers from "../resolvers";
import typeDefs from "../typeDef";

const testServer = new ApolloServer({
  typeDefs,
  resolvers,
});

it("returns list of people", async () => {
  const result = await testServer.executeOperation({
    query: "query GetPeople($offset: Int) { people(offset: $offset){count} }",
    variables: { offset: 1 },
  });

  expect(result.errors).toBeUndefined();
});
