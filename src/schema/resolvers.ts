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
        },
        updateUsername: (parent: any, args: any) => {
            const { id, name } = args.input;
            const user = UserData.find((user: any) => user.id == id);
            if(user) {
                user.name = name;
            }

            //update the user in the database

            return user;
        },
        deleteUser: (parent: any, args: any) => {
            const { id } = args.input;
            const userIndex = UserData.findIndex((user: any) => user.id == id);
            const user = UserData[userIndex];
            if(userIndex > -1) {
                UserData.splice(userIndex, 1);
            }

            //delete the user from the database

            return user;
        }
    }
}

export default resolvers;