import { gql } from "apollo-server-lambda";

const typeDefs = gql`
  type PeopleItem {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
  }

  type People {
    peoples: [PeopleItem]
    count: Int
    next: Int
  }
  
  type Query {
    people(offset: Int): People
    search(search: String!): [PeopleItem]
  }
`;

export default typeDefs;
