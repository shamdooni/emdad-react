import React from "react"
import { compose, withProps, withStateHandlers, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { apiCaller } from '../helpers/ApiCaller'

const MarkerArray = [
  ...JSON.parse(localStorage.getItem('camps')),
  ...JSON.parse(localStorage.getItem('dists')),
  ...JSON.parse(localStorage.getItem('needs')),
]

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={9}
    defaultCenter={{ lat: 34.652697, lng: 46.153564 }}
  >
    {MarkerArray.map((marker)=> {
      if(marker.type == 'camp') {
        return (
          <Marker
            key = {marker._id}
            icon = {{url: 'assets/markers/camp.png'}}
            position={marker.location}
          />
        )
      } else if ( marker.type == 'dist') {
        return (
          <Marker
            key = {marker._id}
            icon = {{url: 'assets/markers/dist.png'}}
            position={marker.location}
            onClick={
              props.onToggleOpen               
            }
            onMouseDown= {
              ()=>{localStorage.setItem('markerId', marker._id); console.log(marker)}
            }
          >

            {props.isOpen && marker._id == localStorage.getItem('markerId') && <InfoWindow onCloseClick={props.onToggleOpen}>
              <div><h3>{marker.rescur.name} - {marker.rescur.title}</h3>
              <p>{marker.goods}</p></div>
              </InfoWindow> 
            }
        </Marker>
        )
      } else if ( marker.type == 'need') {
        return (
          <Marker
            key = {marker._id}
            icon = {{url: 'assets/markers/needs.png'}}
            position={marker.location}
            onClick={
              props.onToggleOpen               
            }
            onMouseDown= {
              ()=>{localStorage.setItem('markerId', marker._id)}
            }
          >
          {props.isOpen && marker._id == localStorage.getItem('markerId') && <InfoWindow onCloseClick={props.onToggleOpen}>
          <div><h3>{marker.rescur.name} - {marker.rescur.title}</h3>
          <p>{marker.needs}</p></div>
          </InfoWindow> 
            }
          </Marker>
        )
      }
        
    })}
  </GoogleMap>
)

export class MyFancyComponent extends React.PureComponent {
  render() {
    return (
      <MyMapComponent
      />
    )
  }
}

