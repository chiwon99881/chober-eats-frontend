import { gql, useMutation, useQuery } from '@apollo/client';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import { Loading } from '../../components/loading';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import {
  createOrderMutation,
  createOrderMutationVariables,
} from '../../__generated__/createOrderMutation';
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
      orderId
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
  const history = useHistory();
  const onCompleted = (data: createOrderMutation) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (ok) {
      const okAlert = window.confirm(
        '주문이 완료되었습니다. 주문 상세보기 화면으로 진입 하시겠습니까?',
      );
      if (okAlert) {
        history.push(`/orders/${orderId}`);
      }
    }
  };
  const [createOrderMutation] = useMutation<
    createOrderMutation,
    createOrderMutationVariables
  >(CREATE_ORDER_MUTATION, { onCompleted });
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
  const getDish = (dishId: number) => {
    return orderItems.find((orderItem) => orderItem.dishId === dishId);
  };
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const isSelected = (dishId: number) => {
    return Boolean(getDish(dishId));
  };
  const optionSelected = (dishId: number, optionName: string) => {
    const dish = getDish(dishId);
    return Boolean(
      dish?.options?.find((findOption) => findOption.name === optionName),
    );
  };
  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((menu) => menu.dishId !== dishId),
    );
  };
  const removeOptionFromItem = (dishId: number, optionName: string) => {
    const dish = getDish(dishId);
    if (dish) {
      const removedOption = dish.options?.filter(
        (option) => option.name !== optionName,
      );
      dish.options = removedOption;
      removeFromOrder(dishId);
      setOrderItems((current) => [...current, dish]);
    }
  };
  const addOptionToItem = (dishId: number, option: any) => {
    if (!isSelected(dishId)) {
      return;
    }
    const findDish = getDish(dishId);
    if (findDish) {
      if (optionSelected(dishId, option.name)) {
        return;
      }
      findDish.options?.push(option);
      removeFromOrder(dishId);
      setOrderItems((current) => [...current, findDish]);
    }
  };
  const triggerCancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };
  const triggerConfirmOrder = () => {
    if (orderItems.length === 0) {
      alert('주문할 메뉴를 선택해주세요.');
      return;
    }
    const ok = window.confirm('주문 하시겠습니까?');
    if (ok) {
      createOrderMutation({
        variables: { input: { restaurantId: +params.id, items: orderItems } },
      });
    }
  };
  console.log(orderItems);
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
            {!orderStarted ? (
              <button
                onClick={triggerStartOrder}
                className='btn text-sm font-semibold'
              >
                메뉴 선택
              </button>
            ) : (
              <>
                <button
                  onClick={triggerConfirmOrder}
                  className='btn text-sm font-semibold mr-3'
                >
                  주문
                </button>{' '}
                <button
                  onClick={triggerCancelOrder}
                  className='btn text-sm font-semibold bg-gray-600 hover:bg-gray-700'
                >
                  취소
                </button>
              </>
            )}
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
                  addOptionToItem={addOptionToItem}
                  optionSelected={optionSelected}
                  removeOptionFromItem={removeOptionFromItem}
                />
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
};
