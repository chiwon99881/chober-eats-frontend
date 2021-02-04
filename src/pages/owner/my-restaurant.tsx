import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import { Loading } from '../../components/loading';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
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
      <div className='w-full max-w-7xl h-screen mx-auto'>
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
            <div className='grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10'>
              {data?.myRestaurant.restaurant?.menu?.map((menu, index) => (
                <Dish
                  key={index}
                  name={menu.name}
                  description={menu.description}
                  price={menu.price}
                />
              ))}
            </div>
          )}
          <div className='mt-20 pb-16 w-full flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-semibold'>판매량</h1>
            <div>
              <VictoryChart domainPadding={20}>
                <VictoryAxis
                  label='판매수'
                  dependentAxis
                  tickValues={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                />
                <VictoryAxis label='기간' />
                <VictoryBar
                  data={[
                    { x: 10, y: 20 },
                    { x: 20, y: 5 },
                    { x: 35, y: 55 },
                    { x: 45, y: 100 },
                  ]}
                />
              </VictoryChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
