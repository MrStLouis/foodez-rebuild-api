import Sequelize from 'sequelize';

import sql from '../config/sql';

// import models here
import Posts from './posts';
import Users from './users';

const models = {
  Posts,
  Users,
};

// add aliases as needed to avoid sql injection
// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security

const { Op } = Sequelize;
const operatorsAliases = {};

const sequelize = new Sequelize(
  process.env.SQL_DATABASE || sql.SQL_DATABSE,
  process.env.SQL_USERNAME || sql.SQL_USERNAME,
  process.env.SQL_PASSWORD || sql.SQL_PASSWORD,
  {
    dialect: process.env.SQL_DIALIECT || sql.SQL_DIALECT,
    host: process.env.SQL_HOST || sql.SQL_HOST,
    port: process.env.SQL_PORT || sql.SQL_PORT,
    operatorsAliases,
    logging: false,
  },
);

const db = {};
Object.entries(models).forEach(([modelName, sequelizeModel]) => {
  sequelize.import(modelName, (sequlize, DataTypes) => {
    const m = sequelizeModel(sequelize, DataTypes);
    db[modelName] = m;
  });
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
