import { ApolloServer } from "@apollo/server";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";
import { startStandaloneServer } from '@apollo/server/standalone';


const server = new ApolloServer({
    typeDefs, resolvers
});

