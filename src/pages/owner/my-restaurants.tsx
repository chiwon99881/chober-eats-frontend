import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { Restaurant } from '../../components/restaurant';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import { myRestaurantsQuery } from '../../__generated__/myRestaurantsQuery';

export const MY_RESTAURANTS_QUERY = gql`
  query myRestaurantsQuery {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants = () => {
  const { data, loading, error } = useQuery<myRestaurantsQuery>(
    MY_RESTAURANTS_QUERY,
  );
  console.log(data);
  if (loading || error) {
    return <Loading />;
  } else {
    return (
      <div className='max-w-screen-xl mx-auto p-16'>
        <Helmet>
          <title>My Restaurants | Chober-Eats</title>
        </Helmet>
        {data?.myRestaurants.ok &&
          data.myRestaurants.restaurants?.length === 0 && (
            <div className='mt-60 flex flex-col justify-center items-center'>
              <span className='text-5xl text-black font-semibold'>
                생성된 레스토랑이 없습니다.
              </span>
              <span className='text-lg font-medium mt-5'>
                <Link
                  to='/add-restaurants'
                  className='text-lime-500 hover:underline'
                >
                  본인의 레스토랑을 게시하세요 &rarr;
                </Link>
              </span>
            </div>
          )}
        {data?.myRestaurants.ok &&
          data?.myRestaurants?.restaurants &&
          data.myRestaurants.restaurants.length > 0 && (
            <>
              <span className='text-6xl font-semibold text-black'>
                {`My ${data.myRestaurants.restaurants.length} Restaurants`}
              </span>
              <div className='border-t border-gray-300 my-8' />
              <div className='grid lg:grid-cols-3 gap-x-5 gap-y-10 mb-24'>
                {data?.myRestaurants?.restaurants?.map((restaurant, index) => (
                  <Restaurant
                    key={index}
                    id={restaurant.id}
                    categoryName={restaurant.category?.name}
                    coverImg={restaurant.coverImage}
                    restaurantName={restaurant.name}
                  />
                ))}
              </div>
            </>
          )}
      </div>
    );
  }
};
