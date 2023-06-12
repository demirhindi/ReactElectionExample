import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { cities } from '../data/il';

const Maps = ({ position, customIcon, mapStyle, handleCityClick, selectedCity }) => {
  const closePopup = () => {
    handleCityClick(null);
  };

  return (
    <div>

      <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <GeoJSON
          data={cities}
          style={mapStyle}
          onEachFeature={(feature, layer) => {
            layer.on({
              click: handleCityClick,
            });
          }}
        />
      </MapContainer>
      {selectedCity && (
        <div className="popup-container">
          {/* Implement the selected city popup */}
        </div>
      )}
    </div>
  );
};
export default Maps;