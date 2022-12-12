/** 
 * utility for getting the host depending on the environment
*/
export default function() {
  const env = process.env.NODE_ENV || "development";

  if (env === 'development') {
    return "http://localhost:3000/";
  } else if (env === "test") {
    return "http://localhost:3000/";
  } else if (env === "production") {
    return "https://custom-deployment-url.com/";
  } else {
    // define default case
    return "http://localhost:3000/"
  }

}
