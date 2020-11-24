import React, {useEffect, useState} from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import MapView, {Marker,Callout} from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import Constants from "expo-constants";
import Ionicons from "react-native-vector-icons/Ionicons";

const oldStreet = {
    latitude: 37.786882,
    longitude: -122.399972,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

const SEARCH_URL = '/businesses/search';

const api = axios.create({
    baseURL: 'https://api.yelp.com/v3',
    headers: {
        Authorization: `Bearer ${Constants.manifest.extra.yelpApiKey}`
    }
})

const currentLocation = {
    latitude: '37.786882',
    longitude: '-122.399972'
}

const Test = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            const result = await api.get(SEARCH_URL, {
                params: {
                    categories: 'coffee, coffeeroasteries, coffeeshop',
                    ...currentLocation
                }
            })

            setData(result.data.businesses)
        }
        fetchData()
    },[]);

    return (
        <SafeAreaView
            style={{ flex: 1}}
        >
            <MapView initialRegion={oldStreet} style={styles.mapStyle}>
                {data.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coordinates}
                        title={marker.name}
                    >
                        <Callout style={{flex: 1}}>
                            <View>
                                <Text>This is a plain view</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </SafeAreaView>
    )
}


export default Test;


const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
})

