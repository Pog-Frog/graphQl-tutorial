import gql from 'graphql-tag';

// enums are used to define a set of constants and for validation
//inputs are used to set default values for the input fields
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        nationality: Nationality
        friends: [User!]
        favoriteMovies: [Movie!]
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        movies: [Movie!]!
        movie(name: String!): Movie
    }
    
    enum Nationality {
        Chinese
        Canadian
        American
        Pakistani
        Mexican
    }

    type Movie {
        id: ID!
        name: String!
        year: Int!
        isPopular: Boolean!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int!
        nationality: Nationality = American
    }

    input UpdateUsernameInput {
        id: ID!
        name: String!
    }

    input DeleteUserInput {
        id: ID!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User!
        updateUsername(input: UpdateUsernameInput!): User!
        deleteUser(input: DeleteUserInput!): User!
    }
`;

export default typeDefs;