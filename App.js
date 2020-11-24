import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, PanResponder} from 'react-native';
import DeckScreen from './screens/Deck'
import TestScreen from './screens/Test'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
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
                            } else if (route.name === 'Test') {
                                iconName = focused ? 'ios-list-box' : 'ios-list';
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
                    <Tab.Screen name="Test" component={TestScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default App;
