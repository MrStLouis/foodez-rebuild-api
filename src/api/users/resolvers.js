import { resolver } from 'graphql-sequelize';
import { promisify } from 'util';

export default {
  Query: {
    me(parent, args, context) {
      const { user } = context;
      return user;
    },
    user(parent, args, context, info) {
      const { user, db } = context;
      return resolver(db.Users)(parent, args, context, info);
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
