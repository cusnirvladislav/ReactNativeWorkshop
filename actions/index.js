import * as types from './types'
import axios from "axios";
import Constants from "expo-constants";

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
export const fetchData = () => {
    return async (dispatch) => {
       try {
           dispatch({
               type: types.REQUEST_COFFEESHOPS
           })
           const result = await api.get(SEARCH_URL, {
               params: {
                   categories: 'coffee, coffeeroasteries, coffeeshop',
                   ...currentLocation
               }
           })

           dispatch({
               type: types.REQUEST_COFFEESHOPS_SUCCESS,
               payload: result.data.businesses
           })
       } catch (e){
           dispatch({
               type: types.REQUEST_COFFEESHOPS_FAIL,
               payload: e.message
           })
       }
    }
}