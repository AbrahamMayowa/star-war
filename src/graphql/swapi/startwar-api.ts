const { RESTDataSource } = require('apollo-datasource-rest');


class StarWarAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'https://swapi.dev/api/';
    }
  
    // async getMovie(id) {
    //   return this.get(`movies/${encodeURIComponent(id)}`);
    // }
  
    async people(offset?: number) {
      const data = await this.get('people/', {
        offset,
      });
      return data.results;
    }
  }

  export default StarWarAPI;