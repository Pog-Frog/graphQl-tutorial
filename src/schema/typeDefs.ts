import gql from 'graphql-tag';

// enums are used to define a set of constants and for validation
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        nationality: String!
        friends: [User!]
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
    }
    
    enum Nationality {
        Chinese
        Canadian
        American
        Pakistani
        Mexican
    }
`;

export default typeDefs;