// const Sequelize = require('sequelize');

// const SequelizeConfig = new Sequelize(
//   process.env.DATABASE, 
//   process.env.DATABASE_USER, 
//   process.env.DATABASE_PASS, 
//   {
//     host: process.env.DATABASE_HOST,
//     dialect: 'mysql',
//     operatorsAliases: false,

//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     },
// });

const MongooseConfig = {
  mongoURI: process.env.MONGO_URI
}

module.exports = MongooseConfig;