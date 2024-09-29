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
`;

export default typeDefs;