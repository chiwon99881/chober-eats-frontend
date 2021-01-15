import { gql, useQuery } from '@apollo/client';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { Restaurant } from '../../components/restaurant';
import { SearchForm } from '../../components/search-form';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { category, categoryVariables } from '../../__generated__/category';

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalItems
      restaurants {
        ...RestaurantFragment
      }
      category {
        ...CategoryFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;
interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const [page, setPage] = useState(1);
  const params = useParams<ICategoryParams>();
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page,
          slug: params.slug,
        },
      },
    },
  );
  const onPrevPageClick = () => setPage((current) => current - 1);
  const onNextPageClick = () => setPage((current) => current + 1);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Helmet>
          <title>Category | Chober-Eats</title>
        </Helmet>
        <SearchForm />
        <div className='max-w-screen-xl mx-auto px-24 py-10'>
          <div className='mb-3'>
            <span className='text-sm text-gray-500 font-semibold'>{`Restaurants near me `}</span>
            <FontAwesomeIcon
              icon={faAngleRight}
              className='text-sm text-gray-500 font-semibold mx-3'
            />
            <span className='text-sm font-semibold text-black capitalize'>
              {`${params.slug} delivery near me`}
            </span>
          </div>
          <span className='block text-5xl font-semibold text-black capitalize mb-3'>
            {`${params.slug} Delivery Near Me`}
          </span>
          <span className='text-lg block mb-8'>
            {`Craving ${params.slug}? Discover restaurants near you and get top ${params.slug} 
            options delivered to your door.`}
          </span>
          <div className='border-t border-gray-300'></div>
          <span className='block my-10 text-4xl font-semibold text-black'>
            {`${data?.category.totalItems} Restaurants`}
          </span>
          <div className='grid lg:grid-cols-3 gap-x-5 gap-y-10 mb-24'>
            {data?.category?.restaurants?.map((restaurant, index) => (
              <Restaurant
                key={index}
                id={restaurant.id}
                categoryName={restaurant.category?.name}
                coverImg={restaurant.coverImage}
                restaurantName={restaurant.name}
              />
            ))}
          </div>
          <div className='flex justify-center items-center'>
            {page > 1 && (
              <FontAwesomeIcon
                icon={faAngleLeft}
                className='font-bold text-3xl cursor-pointer'
                onClick={onPrevPageClick}
              />
            )}
            <span className='mx-3'>
              Page {page} of {data?.category.totalPages}
            </span>
            {page !== data?.category.totalPages && (
              <FontAwesomeIcon
                icon={faAngleRight}
                className='font-bold text-3xl cursor-pointer'
                onClick={onNextPageClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};
