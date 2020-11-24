import React from 'react';
import Navigation from "./Navigation";
import {Provider} from 'react-redux'
import store from "./components/store";

const App = () => {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    )
}

export default App;
