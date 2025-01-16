import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Polyline, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import placeholderIcon from '../../assets/placeholder.png';
import pickup from  '../../assets/pickup.png';


const MapComponent = ({ pickupLocation, droplocation }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const pickupPosition = [pickupLocation.lng, pickupLocation.lat]; 
  const dropPosition = [droplocation.lng, droplocation.lat]; 

  //getting the icons ready
  
 const  dropIcon=new L.Icon({
  iconUrl: placeholderIcon,
  iconSize:[35,45],
 })
 const  pickupIcon=new L.Icon({
  iconUrl: pickup,
  iconSize:[35,45],
 })
  useEffect(() => {
    const fetchRouteCoordinates = async () => {
      try {
        const apiKey = 'd3540bd1-d845-4c29-a663-235b97d384a6';
        const url = `https://graphhopper.com/api/1/route?key=${apiKey}`;

        const requestBody = {
          elevation: false,
          points: [pickupPosition, dropPosition], 
          profile: 'car',
          calc_points: true,
          points_encoded: false,
        };

        const response = await axios.post(url, requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.paths && response.data.paths[0]) {
          const points = response.data.paths[0].points.coordinates;
          setRouteCoordinates(points);
        } else {
          console.error('Invalid route data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching route coordinates:', error);
      }
    };

    if (pickupLocation && droplocation) {
      fetchRouteCoordinates();
    }
  }, [pickupLocation, droplocation]);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={[pickupLocation.lat, pickupLocation.lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Pickup Marker */}
        {pickupPosition && (
          <Marker position={[pickupLocation.lat, pickupLocation.lng]} icon={pickupIcon}>
            <Popup>Pickup Location</Popup>
          </Marker>
        )}

        {/* Drop Marker */}
        {dropPosition && (
          <Marker position={[droplocation.lat, droplocation.lng]} icon={dropIcon}>
            <Popup>Drop Location</Popup>
          </Marker>
        )}

       
        {routeCoordinates.length > 0 && (
          <Polyline
            positions={routeCoordinates.map(([lng, lat]) => [lat, lng])} // 
            color="lime"
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
