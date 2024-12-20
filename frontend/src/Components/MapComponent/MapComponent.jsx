import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapComponent = ({ pickupLocation, droplocation }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

    console.log(pickupLocation,droplocation);
  const pickupPosition = pickupLocation && pickupLocation.lat && pickupLocation.long
    ? [pickupLocation.lat, pickupLocation.long]
    : null;

  const dropPosition = droplocation && droplocation.lat && droplocation.long
    ? [droplocation.lat, droplocation.long]
    : null;

  useEffect(() => {
    const fetchRouteCoordinates = async () => {
      try {
        const apiKey = 'd3540bd1-d845-4c29-a663-235b97d384a6';
        const url = `https://graphhopper.com/api/1/route?profile=car&point=${pickupPosition.join(',')}&point=${dropPosition.join(',')}&calc_points=true&points_encoded=false&key=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.paths && response.data.paths[0]) {
          setRouteCoordinates(response.data.paths[0].points.coordinates);
        }
      } catch (error) {
        console.error('Error fetching route coordinates:', error);
      }
    };

    if (pickupPosition && dropPosition) {
      fetchRouteCoordinates();
    }
  }, [pickupPosition, dropPosition]);

  return (
    <div style={{ height: '500px', width: '100%' }}>
     
        <MapContainer
          center={pickupPosition}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

         
          <Marker position={pickupPosition}>
            <Popup>Pickup Location</Popup>
          </Marker>

         
          <Marker position={dropPosition}>
            <Popup>Drop Location</Popup>
          </Marker>

          
          {routeCoordinates.length > 0 && (
            <Polyline
              positions={routeCoordinates.map(([lon, lat]) => [lat, lon])} 
              color="lime"
            />
          )}
        </MapContainer>
      
    </div>
  );
};

export default MapComponent;
