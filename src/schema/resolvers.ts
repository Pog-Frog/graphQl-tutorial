import fakeData from '../../fakeData';

const resolvers = {
    Query: {
        users() {
            return fakeData;
        }
    }
}

export default resolvers;