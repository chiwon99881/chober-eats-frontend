import { gql, useQuery } from '@apollo/client';
import { me } from '../__generated__/me';

const ME = gql`
  query me {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useQuery<me>(ME);
};
