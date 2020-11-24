import React from 'react';
import Navigation from "./Navigation";
import {Provider} from 'react-redux'
import createStore from "./components/store";

const {store} = createStore();

const App = () => {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    )
}

export default App;
