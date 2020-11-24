import React, {useEffect, useState, useRef} from 'react';
import DeckScreen from './screens/Deck'
import MapScreen from './screens/Map'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused
                                    ? 'ios-information-circle'
                                    : 'ios-information-circle-outline';
                            } else if (route.name === 'Map') {
                                iconName = 'ios-map';
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color}/>;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'red',
                        inactiveTintColor: 'gray',
                    }}>
                    <Tab.Screen name="Home" component={DeckScreen}/>
                    <Tab.Screen name="Map" component={MapScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default Navigation;
