import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { FULL_ORDER_FRAGMENT } from '../fragments';
import {
  getOrderQuery,
  getOrderQueryVariables,
} from '../__generated__/getOrderQuery';
import { orderUpdatesSubscription } from '../__generated__/orderUpdatesSubscription';

const GET_ORDER = gql`
  query getOrderQuery($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        ...FullOrderFragment
      }
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdatesSubscription($input: OrderUpdateInput!) {
    orderUpdates(input: $input) {
      ...FullOrderFragment
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const Order = () => {
  const params = useParams<IParams>();
  const { data, subscribeToMore } = useQuery<
    getOrderQuery,
    getOrderQueryVariables
  >(GET_ORDER, {
    variables: { input: { id: +params.id } },
  });
  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: {
          input: {
            id: +params.id,
          },
        },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: orderUpdatesSubscription } },
        ) => {
          if (!data) return prev;
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [data]);
  console.log(data);
  return (
    <div className='w-full max-w-7xl h-screen mx-auto'>
      <Helmet>
        <title>Order Detail | Chober-Eats</title>
      </Helmet>
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='w-full max-w-2xl border border-gray-400 h-1/3 rounded-md flex flex-col'>
          <div className='w-full py-6 bg-lime-700 flex items-center justify-center'>
            <span className='font-semibold text-white text-base'>
              주문 내역 ({params.id})
            </span>
          </div>
          <div className='w-full py-2 flex items-center justify-center'>
            <span className='text-xl font-medium my-2'>
              {data?.getOrder.order?.total} 원
            </span>
          </div>
          <div className='w-full px-2 flex flex-col h-full'>
            <div className='border-t border-gray-300 font-semibold text-base py-3 flex items-center justify-center'>
              식당: {data?.getOrder.order?.restaurant?.name}
            </div>
            <div className='border-t border-gray-300 font-semibold text-base py-3 flex items-center justify-center'>
              받는분: {data?.getOrder.order?.customer?.email}
            </div>
            <div className='border-t border-gray-300 font-semibold text-base py-3 flex items-center justify-center'>
              {data?.getOrder.order?.driver?.email
                ? `드라이버: ${data.getOrder.order.driver.email}`
                : '드라이버: 미지정 상태'}
            </div>
            <div className='border-t border-gray-300 font-semibold text-base py-3 flex items-center justify-center h-full'>
              주문상태:
              <span className='text-xl font-semibold text-lime-700 ml-3'>
                {data?.getOrder.order?.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
