import { gql } from 'graphql-request';

// This query fetches posts (we will pretend they are "medical records" or "patients" for now)
export const GET_MOCK_PATIENTS = gql`
  query GetPatients {
    posts(options: { paginate: { page: 1, limit: 5 } }) {
      data {
        id
        title
        body
      }
    }
  }
`;