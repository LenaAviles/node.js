"use strict";

const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');
const { merge } = require('lodash');
const {userTypeDefs, userResolvers} = require('./user');
const {listTypeDefs, listResolvers} = require('./list');
const query = require('./userQueries');

const resolvers = merge(userResolvers, listResolvers);
// Put together a schema
const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, listTypeDefs],
  resolvers,
});


module.exports = (app) => {

// The GraphQL endpoint
  app.use('/graphql', graphqlExpress({schema}));

// GraphiQL, a visual editor for queries
  app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql', query}));

};
