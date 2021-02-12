import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { FULL_ORDER_FRAGMENT } from '../../fragments';
import { cookedOrdersSubscription } from '../../__generated__/cookedOrdersSubscription';
import { Link, useHistory } from 'react-router-dom';
import {
  takeOrderMutation,
  takeOrderMutationVariables,
} from '../../__generated__/takeOrderMutation';

const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrdersSubscription {
    cookedOrders {
      ...FullOrderFragment
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrderMutation($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
    }
  }
`;

interface ICoords {
  lat: number;
  lng: number;
}

interface IMarkerDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}

const MarkerDriver: React.FC<IMarkerDriverProps> = () => (
  <div className='h-12 w-12 text-lg'>🔰</div>
);

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, [driverCoords]);
  useEffect(() => {
    if (map) {
      map.panTo(new google.maps.LatLng(driverCoords?.lat, driverCoords?.lng));
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          //location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
          address: '대한민국 경기도 고양시 덕양구 고양대로1384번길 30',
        },
        (result, status) => {
          console.log(result[0].geometry.location.toJSON(), status);
        },
      );
    }
  }, [driverCoords?.lat, driverCoords?.lng, map]);
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords?.lat, driverCoords?.lng));
    setMap(map);
  };
  const onCookedOrders = () => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    if (map) {
      console.log(driverCoords.lat, driverCoords.lng);
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng,
            ),
          },
          destination: {
            location: new google.maps.LatLng(37.6531712, 126.836678),
          },
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result, status) => {
          console.log(status, result);
          directionsRenderer.setDirections(result);
        },
      );
    }
  };
  const { data: cookedOrdersData } = useSubscription<cookedOrdersSubscription>(
    COOKED_ORDERS_SUBSCRIPTION,
  );
  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      onCookedOrders();
    }
  }, [cookedOrdersData]);
  const history = useHistory();
  const onCompleted = (data: takeOrderMutation) => {
    if (data.takeOrder.ok) {
      history.push(`/orders/${cookedOrdersData?.cookedOrders.id}`);
    }
  };
  const [takeOrderMutation] = useMutation<
    takeOrderMutation,
    takeOrderMutationVariables
  >(TAKE_ORDER_MUTATION, { onCompleted });
  const triggerTakeOrderMutation = (orderId: number) => {
    takeOrderMutation({
      variables: { input: { id: orderId } },
    });
  };
  return (
    <div>
      <div
        className='overflow-hidden'
        style={{ width: window.innerWidth, height: '50vh' }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={16}
          defaultCenter={{ lat: 37.5, lng: 126.8 }}
          bootstrapURLKeys={{ key: 'AIzaSyAHaJAE9IccReZvbX0RD8vDZpA2M3YrIwE' }}
        >
          <MarkerDriver
            // @ts-ignore
            lat={driverCoords?.lat}
            lng={driverCoords?.lng}
          />
        </GoogleMapReact>
      </div>
      {cookedOrdersData?.cookedOrders && (
        <div className='w-full max-w-screen-lg mx-auto bg-white flex items-center justify-center flex-col relative -top-10 py-10 px-5 shadow-md'>
          <h1 className='text-3xl font-semibold'>New Cooked Order</h1>
          <h4 className='text-xl font-medium'>Pick it up soon!</h4>
          <button
            onClick={() =>
              triggerTakeOrderMutation(cookedOrdersData.cookedOrders.id)
            }
            className='btn'
          >
            Accept Challenge
          </button>
        </div>
      )}
    </div>
  );
};
