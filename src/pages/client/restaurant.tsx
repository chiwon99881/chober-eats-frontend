import { gql, useQuery } from '@apollo/client';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import { Loading } from '../../components/loading';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import {
  getRestaurantQuery,
  getRestaurantQueryVariables,
} from '../../__generated__/getRestaurantQuery';

const RESTAURANT_QUERY = gql`
  query getRestaurantQuery($input: RestaurantInput!) {
    getRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantFragment
        menu {
          ...DishFragment
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const params = useParams<IRestaurantParams>();
  const { loading, data } = useQuery<
    getRestaurantQuery,
    getRestaurantQueryVariables
  >(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +params.id,
      },
    },
  });
  console.log(data, loading);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Helmet>
          <title>Restaurant | Chober-Eats</title>
        </Helmet>
        <div
          className='w-full max-w-7xl py-52 bg-center bg-cover mx-auto'
          style={{
            backgroundImage: `url(${data?.getRestaurant.restaurant?.coverImage})`,
          }}
        >
          <div className='w-2/5 py-4 pl-16'>
            <span className='block text-5xl font-semibold text-white'>
              {data?.getRestaurant.restaurant?.name}
            </span>
            <div className='flex items-center mt-2'>
              <span className='text-xl font-medium text-white'>
                {data?.getRestaurant.restaurant?.category?.name}
              </span>
              <FontAwesomeIcon
                icon={faCircle}
                className='text-xs font-medium text-white mx-3'
              />
              <span className='text-xl font-medium text-white'>
                {data?.getRestaurant.restaurant?.address}
              </span>
            </div>
          </div>
        </div>
        <div className='w-full max-w-7xl mx-auto'>
          {data?.getRestaurant.restaurant?.menu?.length === 0 ? (
            <span className='text-3xl font-semibold mt-6 block'>
              레스토랑에 등록된 음식이 없습니다.
            </span>
          ) : (
            <div className='grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10'>
              {data?.getRestaurant.restaurant?.menu?.map((menu, index) => (
                <Dish
                  key={index}
                  name={menu.name}
                  description={menu.description}
                  price={menu.price}
                  isCustomer={true}
                  options={menu.options}
                />
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
};
