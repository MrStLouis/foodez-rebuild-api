import { resolver } from 'graphql-sequelize';

export default {
  Query: {
    posts(parent, args, { db }) {
      return resolver(db.Posts);
    },
  },
  Mutation: {
    async makePost(parent, { name }, context, info) {
      const { db } = context;
      const post = await db.Posts.create({
        name,
        views: 0,
      });
      return resolver(db.Posts)(parent, { id: post.id }, context, info);
    },
  },
};
