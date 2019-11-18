import React from 'react';
import { StyleSheet, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

export default class TrackingView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trackMotorbike: {
        coordinate: {
          latitude: 10.877831,
          longitude: 106.801490
        },
      },
      region: {
        latitude: 10.877831,
        longitude: 106.801490,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: {
        title: 'Your stuff Here'
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.coordinate != this.props.coordinate) {
      let {longitude, latitude} = this.props.coordinate
      let region = {
        ...this.state.region,
        latitude: latitude,
        longitude: longitude
      }
      let coorText = 'Longitude: ' + longitude + ' - Latitude: ' + latitude
      this.setState({region, coorText})
    }
  }

  onRegionChange = (region) => {
    this.setState({ region: region })
  }

  render() {
    return (
      <MapView
        style={styles.mapViewStyle}
        region={this.state.region}
      > 
        <Marker
          coordinate={this.props.coordinate ? this.props.coordinate : this.state.trackMotorbike.coordinate}
          title={this.state.marker.title}
          description={this.state.coorText}
        />
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  mapViewStyle: {
    flex: 1,
    // height: 500
  }
});
