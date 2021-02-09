import { gql, useQuery } from '@apollo/client';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import { Loading } from '../../components/loading';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import {
  getRestaurantQuery,
  getRestaurantQueryVariables,
} from '../../__generated__/getRestaurantQuery';
import { CreateOrderItemInput } from '../../__generated__/globalTypes';

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

const CREATE_ORDER_MUTATION = gql`
  mutation createOrderMutation($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
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
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const isSelected = (dishId: number) => {
    return Boolean(
      orderItems.find((orderItems) => orderItems.dishId === dishId),
    );
  };
  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: null }, ...current]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((menu) => menu.dishId !== dishId),
    );
  };
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
          <div className='mt-10 flex justify-end'>
            <button
              onClick={triggerStartOrder}
              className='btn text-sm font-semibold'
            >
              {orderStarted ? '메뉴 선택 중' : '주문하기'}
            </button>
          </div>
          {data?.getRestaurant.restaurant?.menu?.length === 0 ? (
            <span className='text-3xl font-semibold mt-6 block'>
              레스토랑에 등록된 음식이 없습니다.
            </span>
          ) : (
            <div className='grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10'>
              {data?.getRestaurant.restaurant?.menu?.map((menu, index) => (
                <Dish
                  id={menu.id}
                  orderStarted={orderStarted}
                  isSelected={isSelected(menu.id)}
                  key={index}
                  name={menu.name}
                  description={menu.description}
                  price={menu.price}
                  isCustomer={true}
                  options={menu.options}
                  addItemToOrder={addItemToOrder}
                  removeFromOrder={removeFromOrder}
                />
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
};
