import { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { SETLATLNG } from "../../hooks/constant";

const MapContainer = ({ google, dispatch, defaultData, setDefaultData }) => {
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    const handleMapClick = (mapProps, map, clickEvent) => {
        const { latLng } = clickEvent;
        const lat = latLng.lat();
        const lng = latLng.lng();
        dispatch({
            type: SETLATLNG,
            payload: { lat, lng },
        });
        setDefaultData([lat, lng]);
        setCoordinates({ lat, lng });
    };

    return (
        <div>
            {" "}
            <Map
                google={google}
                zoom={5}
                style={{ width: "600px", height: "350px" }}
                onClick={handleMapClick}
                initialCenter={{
                    lat:
                        defaultData?.length > 0 && defaultData[0]
                            ? defaultData[0]
                            : 22.3064319,
                    lng:
                        defaultData?.length > 0 && defaultData[1]
                            ? defaultData[1]
                            : 71.8970167,
                }} // Set your initial center coordinates here
            >
                {(defaultData?.length > 0 ||
                    (coordinates.lat && coordinates.lng)) && (
                    <Marker
                        position={{
                            lat:
                                defaultData?.length > 0 && defaultData[0]
                                    ? defaultData[0]
                                    : coordinates.lat,
                            lng:
                                defaultData?.length > 0 && defaultData[1]
                                    ? defaultData[1]
                                    : coordinates.lng,
                        }}
                    />
                )}
            </Map>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY, // Replace with your own Google Maps API key
})(MapContainer);
