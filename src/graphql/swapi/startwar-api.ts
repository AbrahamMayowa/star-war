import  { RESTDataSource } from 'apollo-datasource-rest';
import { environment } from "../../../config/environment";

class StarWarAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = environment.swBaseUrl;
    }
  
    async search(searchValue: string) {
      const data = await this.get('/', {
        search: searchValue,
      });
      return data;
    }
  
    async people(offset: number) {
      const data = await this.get('/', {
        page: offset,
      });
      return data;
    }
  }

  export default StarWarAPI;

  