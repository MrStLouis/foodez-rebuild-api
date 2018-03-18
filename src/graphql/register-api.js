import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

// import schema and resolvers from '../../api/*'
import PostsSchema from '../api/posts/Post.graphql';
import PostsResolvers from '../api/posts/resolvers';
import UsersSchema from '../api/users/User.graphql';
import UsersResolvers from '../api/users/resolvers';

// add schemas to typeDefs
const typeDefs = [
  PostsSchema,
  UsersSchema,
];

// add resolvers (res1, res2)
const resolvers = merge(
  PostsResolvers,
  UsersResolvers,
);


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
