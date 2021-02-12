import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

interface ICoords {
  lat: number;
  lng: number;
}

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>();
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
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new maps.LatLng(driverCoords?.lat, driverCoords?.lng));
  };
  return (
    <div>
      <div
        className='overflow-hidden'
        style={{ width: window.innerWidth, height: '95vh' }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={16}
          defaultCenter={{ lat: 37.5, lng: 126.8 }}
          bootstrapURLKeys={{ key: 'AIzaSyAHaJAE9IccReZvbX0RD8vDZpA2M3YrIwE' }}
        ></GoogleMapReact>
      </div>
    </div>
  );
};
