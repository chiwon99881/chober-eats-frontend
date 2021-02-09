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

export interface getRestaurantQuery_getRestaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface getRestaurantQuery_getRestaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: getRestaurantQuery_getRestaurant_restaurant_menu_options_choices[] | null;
}

export interface getRestaurantQuery_getRestaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: getRestaurantQuery_getRestaurant_restaurant_menu_options[] | null;
}

export interface getRestaurantQuery_getRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: getRestaurantQuery_getRestaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: getRestaurantQuery_getRestaurant_restaurant_menu[] | null;
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
