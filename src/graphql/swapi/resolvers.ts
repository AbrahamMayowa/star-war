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
      try {
        axiosRetry(axios, { retries: 5 });
      const result = await axios(url);
      let next = null;
      let prev = null;
      const resultNext = result?.data?.next;
      const resultPrev = result?.data?.previous;

      if (resultNext) {
        const splitedNext = resultNext?.split("=");
        next = splitedNext[splitedNext.length - 1];
      }

      if (resultPrev) {
        const splitedPrev = resultPrev?.split("=");
        prev = splitedPrev[splitedPrev.length - 1];
      }

      return {
        peoples: result?.data?.results,
        count: result?.data?.count,
        next,
        prev
      };
      } catch (error) {
        throw  new Error('Internal server error');
      }
      
    },
    search: async (_, { search }): Promise<People[]> => {
      let url = `${environment.swBaseUrl}?search=${search}`;
      try {
        axiosRetry(axios, { retries: 5 });
        const result = await axios(url);
        return result?.data?.results;
      } catch (error) {
        throw  new Error('Internal server error');
      }
      
    },
  },
};

export default resolvers;
