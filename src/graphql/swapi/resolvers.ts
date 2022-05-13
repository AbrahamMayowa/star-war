//import retry from 'async-retry';
import axios from "axios";
import axiosRetry from "axios-retry";
import { PeopleResponse, People } from "./types";
import { environment } from "../../../config/environment";
const resolvers = {
  Query: {
    people: async (_, { offset }): Promise<PeopleResponse> => {

      let url = environment.swBaseUrl
      if (offset) {
        url = `${environment.swBaseUrl}?page=${offset}`;
      }
      
      axiosRetry(axios, { retries: 5 });
      const result = await axios(url);
      let next = null;
      const resultNext = result?.data?.next;
      if (resultNext) {
        const splitedNext = resultNext?.split("=");
        next = splitedNext[splitedNext.lenght - 1];
      }
      return {
        peoples: result?.data?.results,
        count: result?.data?.count,
        next,
      };
    },
    search: async (_, { search }): Promise<People[]> => {
      let url = `${environment.swBaseUrl}?search=${search}`;
      axiosRetry(axios, { retries: 5 });
      const result = await axios(url);
      return result?.data?.results;
    },
  },
};

export default resolvers;
