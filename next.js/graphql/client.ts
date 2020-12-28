import { ApolloClient, InMemoryCache, from, gql } from '@apollo/client';
import Router from 'next/router'
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { AUTH_TOKEN } from 'constants/common';
import { createUploadLink } from 'apollo-upload-client'
import { matchValidationErrorCategory } from 'helpers';
import routes from 'constants/routes';
import { ActiveUser, IsLoggedIn } from 'graphql/variables';
import { toast } from 'react-toastify';

const uploadLink = createUploadLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_HOST });

const setAuthorizationLink = setContext((request, previousContext) => ({
  headers: {
    authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN)
  }
}));


const errorLink = onError((graphQLErrors) => {

  if (matchValidationErrorCategory(graphQLErrors, 'authentication')) {

    localStorage.removeItem('_token');

    IsLoggedIn(false);
    ActiveUser(null);

    toast.error("Your sessions is expired.");
    Router.replace(routes.auth.login);
  }

  if (graphQLErrors.networkError) console.log(`[Network error]: ${graphQLErrors.networkError}`);
});

export default new ApolloClient({
  link: from([setAuthorizationLink, errorLink, uploadLink]),
  cache: new InMemoryCache(),
});