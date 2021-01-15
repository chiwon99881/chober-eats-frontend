/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getRestaurantQuery
// ====================================================

export interface getRestaurantQuery_getRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface getRestaurantQuery_getRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: getRestaurantQuery_getRestaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
}

export interface getRestaurantQuery_getRestaurant {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: getRestaurantQuery_getRestaurant_restaurant | null;
}

export interface getRestaurantQuery {
  getRestaurant: getRestaurantQuery_getRestaurant;
}

export interface getRestaurantQueryVariables {
  input: RestaurantInput;
}
