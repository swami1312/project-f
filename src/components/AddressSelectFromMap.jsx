import { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 17.385044,
  lng: 78.486671,
};

const libraries = ["places"];

export default function AddressSelectFromMap({ onSelect }) {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [marker, setMarker] = useState(defaultCenter);
  const [address, setAddress] = useState("");

  const autocompleteRef = useRef(null);

  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;

    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setMapCenter(location);
    setMarker(location);
    setAddress(place.formatted_address);

    onSelect?.({
      address: place.formatted_address,
      lat: location.lat,
      lng: location.lng,
    });
  };

  const onMapClick = useCallback(
    (e) => {
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };

      setMarker(location);
      setMapCenter(location);

      onSelect?.({
        address: "Selected from map",
        lat: location.lat,
        lng: location.lng,
      });
    },
    [onSelect]
  );

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="space-y-3">
        {/* Address Search */}
        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search address..."
            className="w-full border rounded px-3 py-2"
          />
        </Autocomplete>

        {/* Map */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={14}
          onClick={onMapClick}
        >
          <Marker position={marker} />
        </GoogleMap>

        {/* Selected Address */}
        {address && <p className="text-sm text-gray-600">📍 {address}</p>}
      </div>
    </LoadScript>
  );
}
