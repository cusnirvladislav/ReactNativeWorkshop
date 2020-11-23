import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated, PanResponder, Dimensions } from 'react-native';
import CoffeeShop from './CoffeeShop'

const SCREEN_WIDTH = Dimensions.get('window').width 
const SWIPE_THRESHOLD = 125;
const DURATION = 500;

  const Deck = ({ data, onSwipeRight, onSwipeLeft }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const position = useRef(new Animated.ValueXY()).current

    const resetPosition = () => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true
          }).start()
    }

    const swipeCallback = (direction) => {
        // const item = data[currentIndex];

        // direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

        setCurrentIndex((prev)=> prev+1);
        position.setValue({x:0, y:0});
    }

    const forceSwipe = (direction, onSwipeComplete) => {
        const x = direction==='right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

        Animated.timing(position, {
            toValue: {x, y:0},
            duration: DURATION,
            useNativeDriver: true
        }).start(()=>onSwipeComplete(direction))
    }

    const panResponder = useRef(
        PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            position.setOffset({
            x: position.x._value,
            y: position.y._value,
            })
        },
        onPanResponderMove: (_, gesture) => {
            position.setValue({ x: gesture.dx, y: gesture.dy })
        },
        onPanResponderRelease: (event, gesture) => {
            if (gesture.dx > SWIPE_THRESHOLD) {
                forceSwipe('right', swipeCallback)
                console.log('right')
            } else if (gesture.dx < -SWIPE_THRESHOLD) {
                forceSwipe('left', swipeCallback)
                console.log('left')
            } else {
                resetPosition()
            }
        },
        })
    ).current

    const getCardStyle = () => {
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg'],
        })
        return {
            transform: [...position.getTranslateTransform(),{ rotate }],
        }
    }

      return (
        <>    
          {data.map((item, index)=>{
            if(index < currentIndex){
                return null;
            }  else if (index === currentIndex) {
                return (
                    <Animated.View style={getCardStyle()} {...panResponder.panHandlers}>
                        <CoffeeShop item={item} />
                    </Animated.View>
                )
            } else return <CoffeeShop item={item} />
          })}
       </>
      )
  }

  export default Deck;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });