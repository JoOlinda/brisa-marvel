import { useCallback, useState, memo, } from 'react'
import { GoogleMap, useJsApiLoader, Marker, StandaloneSearchBox } from '@react-google-maps/api'
import { MapNotLoad, InputAddress, InputAddressBar } from './AddressMap.style'
import MapDarkModeConfig from "./MapDarkModeConfig.json"
import API_KEYS from '../../config/public-api-keys'

const containerStyle = {
  width: '600px',
  height: '378px',
}

const startPoint = {
  // Pereiro
  lat: -6.0460626,
  lng: -38.4608898
}

function AddressMap({ setAddress }) {

  const [mapDelivery, setMapDelivery] = useState(null)
  const [searchBox, setSearchBox] = useState()
  const [libraries] = useState(['places'])
  const [makerPoint, setMakerPoint] = useState()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEYS.GoogleMaps.apiKey,
    libraries,
  })

  const onLoad = useCallback(function callback(map) {

    const bounds = new window.google.maps.LatLngBounds(startPoint);
    map.fitBounds(bounds);

    setMapDelivery(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMapDelivery(null)
  }, [])

  const onLoadSearchBox = ref => setSearchBox(ref)
  const onPlacesChanged = async () => {
    let place = searchBox.getPlaces()[0]
    await setMakerPoint({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    })
    setAddress({valid: true, text: place.formatted_address})
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={makerPoint}
      zoom={19}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={
        {
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false,
        }
      }
    >
      <StandaloneSearchBox
        onLoad={onLoadSearchBox}
        onPlacesChanged={
          onPlacesChanged
        }
      >
        <InputAddressBar>
          <InputAddress
            type="text"
            placeholder="Digite o endereço de entrega"
          />
        </InputAddressBar>
      </StandaloneSearchBox>
      <Marker
        position={makerPoint}
        animation={window.google.maps.Animation.DROP}
      />
    </GoogleMap>
  ) : <MapNotLoad />
}

export default memo(AddressMap)