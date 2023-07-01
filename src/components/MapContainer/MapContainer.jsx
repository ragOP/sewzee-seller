import { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { SETLATLNG } from '../../hooks/constant';

const MapContainer = ({ google, dispatch }) => {
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    const handleMapClick = (mapProps, map, clickEvent) => {
        const { latLng } = clickEvent;
        const lat = latLng.lat();
        const lng = latLng.lng();
        dispatch({
            type: SETLATLNG,
            payload: { lat, lng }
        })
        setCoordinates({ lat, lng });
    };



    return (
        <Map
            google={google}
            zoom={5}
            style={{ width: '600px', height: '350px' }}
            onClick={handleMapClick}
            initialCenter={{ lat: 22.3064319, lng: 71.8970167 }} // Set your initial center coordinates here
        >
            {coordinates.lat && coordinates.lng && (
                <Marker
                    position={{ lat: coordinates.lat, lng: coordinates.lng }}
                />
            )}
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBzzV8CQWL_k88rFXB-DyXAKJcLBnumQbQ' // Replace with your own Google Maps API key
})(MapContainer);