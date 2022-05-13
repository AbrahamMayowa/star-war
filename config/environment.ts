type Environment = {
    swBaseUrl: string;
  };
  
  export const environment: Environment = {
    swBaseUrl: process.env.SW_BASE_URL as string,
  };