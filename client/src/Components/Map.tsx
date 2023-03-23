import React, { useState } from 'react'
import ReactMapGL,{GeolocateControl,Marker,NavigationControl, Popup} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import markerImage from "../assets/map-marker.png";

interface ViewPort {
  latitude: number,
  longitude: number,
  zoom?: number,
  scrollZoom?: boolean,
}

function Map(props : ViewPort) {

  const style = {height: '500px'}
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  if (mediaQuery.matches) style.height = '300px';

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [viewport, setViewport] = useState<ViewPort>({
    longitude: props.longitude,
    latitude: props.latitude,
    zoom: 11,
    scrollZoom: false,
  });

  return (

    <>
      <ReactMapGL
        mapboxAccessToken="pk.eyJ1Ijoic2hlbWlsIiwiYSI6ImNsZTVhdjBtejBiOXMzcHFkeDdzenVubnQifQ.ELopMEw5SnKU0QOU85_Bdg"
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={style}
        onClick={(e) => setShowPopup(!showPopup)}
      >

        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <NavigationControl />

        <Marker longitude={viewport.longitude} latitude={viewport.latitude} anchor="bottom" >
          <img src={markerImage} />
        </Marker>

        {showPopup && (
          <Popup longitude={viewport.longitude} latitude={viewport.latitude}
            anchor="top"
            onClose={() => setShowPopup(false)}
            className='shadow-lg rounded-lg tracking-wider text-gray-800'>
            StayHub Home here!
          </Popup>)
        }

      </ReactMapGL>

    </>
  );
}

export default Map;