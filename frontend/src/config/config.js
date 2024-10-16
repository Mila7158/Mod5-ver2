const config = {
    BASE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://your-production-api-url.com'  // Change to your production API URL
      : 'http://localhost:8000', // Development API URL
  };
  
  export default config;
  