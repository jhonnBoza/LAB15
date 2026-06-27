const { Sequelize } = require('sequelize');

const mysqlUrl = process.env.MYSQL_URL;

const sequelize = mysqlUrl
  ? new Sequelize(mysqlUrl, {
      dialect: 'mysql',
      logging: false,
      dialectOptions: {
        ssl: { rejectUnauthorized: false },
        connectTimeout: 60000,
      },
    })
  : new Sequelize(
      process.env.DB_NAME || process.env.MYSQLDATABASE,
      process.env.DB_USER || process.env.MYSQLUSER,
      process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
      {
        host: process.env.DB_HOST || process.env.MYSQLHOST,
        port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
        dialect: 'mysql',
        logging: false,
        dialectOptions: { connectTimeout: 60000 },
      }
    );

module.exports = sequelize;
