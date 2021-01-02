/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurants
// ====================================================

export interface searchRestaurants_searchRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurants_searchRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: searchRestaurants_searchRestaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface searchRestaurants_searchRestaurants {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalItems: number | null;
  restaurants: searchRestaurants_searchRestaurants_restaurants[] | null;
}

export interface searchRestaurants {
  searchRestaurants: searchRestaurants_searchRestaurants;
}

export interface searchRestaurantsVariables {
  input: SearchRestaurantInput;
}
