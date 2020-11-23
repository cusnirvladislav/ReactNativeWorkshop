import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, PanResponder } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios'
import { ListItem, Avatar } from 'react-native-elements'
import fakeCoffeeShops from './fixtures'
import Deck from './Deck'

// console.log('fakeCoffeeShops', fakeCoffeeShops)

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

export default function App() {
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

  const listItem = ({ item }) => (
    <ListItem key={item.id} bottomDivider>
    <Avatar source={{uri: item.image_url}} />
    <ListItem.Title>{item.name}</ListItem.Title>
    {/* <ListItem.Content>
      <ListItem.Title>{item.name}</ListItem.Title>
      <ListItem.Subtitle>{item.name}</ListItem.Subtitle>
    </ListItem.Content> */}
  </ListItem>
  )

  return (
    // <SafeAreaView style={styles.container}>
    //   <FlatList
    //     keyExtractor={(item)=>item.id}
    //     data={fakeCoffeeShops}
    //     renderItem={listItem}
    //   />
    // </SafeAreaView>

    <Deck data={data} onSwipeRight={()=> {}} onSwipeLeft={()=> {}} /> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
