import { PeopleResponse, People } from "./types";
const resolvers = {
  Query: {
    people: async (_, { offset }, { dataSources }): Promise<PeopleResponse> => {
      let page = offset;

      // offset 0 value caused error
      if (offset < 1) {
        page = 1;
      }

      try {
        const result = await dataSources.starwarAPI.people(page);
        let next = null;
        let prev = null;
        const resultNext = result?.next;
        const resultPrev = result?.previous;

        if (resultNext) {
          const splitedNext = resultNext?.split("=");
          next = splitedNext[splitedNext.length - 1];
        }

        if (resultPrev) {
          const splitedPrev = resultPrev?.split("=");
          prev = splitedPrev[splitedPrev.length - 1];
        }

        return {
          peoples: result?.results,
          count: result?.count,
          next,
          prev,
        };
      } catch (error) {
        throw new Error("Internal server error");
      }
    },
    search: async (_, { search }, { dataSources }): Promise<People[]> => {
      try {
        const result = await dataSources.starwarAPI.search(search);
        return result?.results;
      } catch (error) {
        throw new Error("Internal server error");
      }
    },
  },
};

export default resolvers;
