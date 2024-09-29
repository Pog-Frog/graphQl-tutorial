import gql from 'graphql-tag';


const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        nationality: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
    }
`;

export default typeDefs;