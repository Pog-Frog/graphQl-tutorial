import { UserData, MovieData } from '../../fakeData';

const resolvers = {
    Query: {
        users: () => {
            return UserData;
        },
        user: (parent: any, args: any) => {
            return UserData.find((user: any) => user.id == args.id);
        },
        movies: () => {
            return MovieData;
        },
        movie: (parent: any, args: any) => {
            return MovieData.find((movie: any) => movie.name == args.name);
        }
    },

    User: {
        favoriteMovies: (parent: any) => {
            return MovieData.filter((movie: any) => parent.favoriteMovies?.includes(movie.id));
        }
    },

    Mutation: {
        createUser: (parent: any, args: any) => {
            const newUser = args.input;
            newUser.id = UserData.length + 1;
            
            // Add the new user to the database
            UserData.push(newUser);

            return newUser;
        }
    }
}

export default resolvers;