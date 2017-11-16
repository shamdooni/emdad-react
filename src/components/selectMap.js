import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import geolocation from 'geolocation'

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.setState({
        bounds: null,
        center: {
            lat: 34.652697, lng: 46.153564
        },
        onMapMounted: ref => {
            refs.map = ref;
        }, 
        onBoundsChanged: () => {
            localStorage.setItem('location', JSON.stringify(refs.map.getCenter()));
            this.setState({
                bounds: refs.map.getBounds(),
                center: refs.map.getCenter(),
            })
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={8}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    
    
  >
    {props.isMarkerShown && <Marker position={ props.center} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

export class SelectMap extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}