import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import {
  myRestaurantQuery,
  myRestaurantQueryVariables,
} from '../../__generated__/myRestaurantQuery';

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurantQuery($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
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

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const params = useParams<IParams>();
  const { data, error, loading: queryLoading } = useQuery<
    myRestaurantQuery,
    myRestaurantQueryVariables
  >(MY_RESTAURANT_QUERY, { variables: { input: { id: +params.id } } });
  console.log(data);
  if (queryLoading || error) {
    return <Loading />;
  } else {
    return (
      <div className='w-full max-w-7xl h-screen border border-gray-900 mx-auto'>
        <Helmet>
          <title>My Restaurant | Chober-Eats</title>
        </Helmet>
        <div
          className='w-full max-w-7xl h-2/5 bg-center bg-cover'
          style={{
            backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
          }}
        ></div>
        <div className='w-full max-w-7xl px-12 py-6 h-auto flex flex-col'>
          <span className='text-4xl font-semibold'>
            {data?.myRestaurant.restaurant?.name}
          </span>
          <div className='flex items-center mt-8'>
            <Link to={`/restaurant/${params.id}/add-dish`} className='mr-8'>
              <button className='p-3 bg-gray-700 text-white font-semibold rounded'>
                음식 추가하기 &rarr;
              </button>
            </Link>
            <Link to='/add-promotion'>
              <button className='p-3 bg-lime-600 text-white font-semibold rounded'>
                프로모션 신청하기 &rarr;
              </button>
            </Link>
          </div>
        </div>
        <div className='mx-12 border-t border-gray-300'>
          {data?.myRestaurant.restaurant?.menu?.length === 0 ? (
            <span className='text-3xl font-semibold mt-6 block'>
              레스토랑에 등록된 음식이 없습니다.
            </span>
          ) : (
            <div>
              {data?.myRestaurant.restaurant?.menu?.map((menu, index) => (
                <span key={index}>{menu.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
};
