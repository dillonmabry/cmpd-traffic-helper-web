/* 
  Config file for environment variables
  1. Create a file .env under project root
  2. Define environment variables
  3. Run npm dev, all env variables should be accessible
*/
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;
console.log(envs);
module.exports = envs;