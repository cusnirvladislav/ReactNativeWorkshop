import React, { useEffect} from 'react';
import {SafeAreaView } from 'react-native-safe-area-context';
import Cards from "../components/Cards";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../actions";

export default function App() {
    const dispatch = useDispatch();
    const coffeeShops = useSelector((reduxState)=> reduxState.coffeeShops);

    useEffect(()=>{
        dispatch(fetchData())
    },[]);

    return (
        <SafeAreaView
            style={{ flex: 1}}
        >
            <Cards data={coffeeShops} onSwipeRight={()=> {}} onSwipeLeft={()=> {}} />
        </SafeAreaView>
    );
}

