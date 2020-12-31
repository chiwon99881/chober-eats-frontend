import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { LOCALSTORAGE_TOKEN } from './constants';

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const isVerifyPage = makeVar(false);
export const authToken = makeVar(token);

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-jwt': authToken() || '',
    },
  };
});

export const client = new ApolloClient({
  //concat은 link에 link를 추가해주는 함수
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          isVerifyPage: {
            read() {
              return isVerifyPage();
            },
          },
          token: {
            read() {
              return authToken();
            },
          },
        },
      },
    },
  }),
});
