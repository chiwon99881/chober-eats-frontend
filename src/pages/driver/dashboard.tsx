import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

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
          location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
        },
        (result, status) => {
          console.log(result, status);
        },
      );
    }
  }, [driverCoords?.lat, driverCoords?.lng, map]);
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords?.lat, driverCoords?.lng));
    setMap(map);
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
    </div>
  );
};
