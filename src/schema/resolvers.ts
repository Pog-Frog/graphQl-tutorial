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
    }
}

export default resolvers;