import { resolver } from 'graphql-sequelize';
import { promisify } from 'util';

export default {
  Query: {
    getUser(parent, args, { user }) {
      return user || {};
    },
  },
  Mutation: {
    async createUser(parent, { username, password, email }, { db }) {
      const user = await db.Users.build({ username, email });
      const setPassword = promisify(user.setPassword).bind(user);
      await setPassword(password);
      user.save();
      return user;
    },
  },
};
