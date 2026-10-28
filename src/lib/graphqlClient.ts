import { GraphQLClient } from 'graphql-request';

// We are using a free public mock API for testing
export const graphqlClient = new GraphQLClient('https://graphqlzero.almansi.me/api');