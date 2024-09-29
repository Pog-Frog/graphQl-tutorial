import fakeData from '../../fakeData';

const resolvers = {
    Query: {
        users: () => {
            return fakeData;
        },
        user: (parent: any , args: any) => {
            return fakeData.find((user: any) => user.id == args.id);
        }
    }
}

export default resolvers;