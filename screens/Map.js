import React, {useEffect, useState} from 'react';
import { Dimensions, StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import MapView, {Marker,Callout} from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import Constants from "expo-constants";
import { AppLoading } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

let currentLocation = {
    latitude: 37.786882,
    longitude: -122.399972,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

const Map = () => {
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
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
        if(location) {fetchData()}
    },[location]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            })
            setTimeout(()=>{
                setLocation(location)
            },5000)
        })()
    }, [])

    if(!location) {
       return  (
           <View style={{flex: 1, backgroundColor: '', alignItems: 'center'}}>
               <ActivityIndicator color="blue" size="large" />
           </View>
       )
    }

    currentLocation = {
        ...currentLocation,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    }

    return (
        <SafeAreaView
            style={{ flex: 1}}
        >
            <MapView initialRegion={currentLocation} style={styles.mapStyle}>
                {data.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coordinates}
                        title={marker.name}
                    >
                        <Callout style={{flex: 1}}>
                            <View style={{flex: 1, justifyContent:"center",alignItems: "center"}}>
                                <Image
                                    style={{width: 50, height: 50}}
                                    source={{
                                        uri: marker.image_url
                                    }} />
                                <Text>This is a plain view</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </SafeAreaView>
    )
}


export default Map;


const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
})

