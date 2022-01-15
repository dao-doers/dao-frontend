/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';

export const GET_BLOCK = gql`
  {
    _meta {
      block {
        number
      }
    }
  }
`;
