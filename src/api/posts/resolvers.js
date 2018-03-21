import { resolver } from 'graphql-sequelize';

export default {
  Query: {
    posts(parent, args, context, info) {
      const { db, user } = context;
      if (!user) return [];
      return resolver(db.Posts, {
        dataloader: false,
        before: (findOptions) => {
          findOptions.where = findOptions.where || {};
          findOptions.where.ownerId = user.id;
          return findOptions;
        },
      })(parent, args, context, info);
    },
  },
  Mutation: {
    async makePost(parent, { name }, context, info) {
      const { db, user } = context;
      const post = await db.Posts.create({
        name,
        ownerId: user.get('id'),
        views: 0,
      });
      return resolver(db.Posts)(parent, { id: post.id }, context, info);
    },
  },
};
