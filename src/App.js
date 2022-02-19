import RouterPaths from "./router";

import React from "react";
import {createStore,applyMiddleware } from "redux";
import {Provider} from "react-redux"
import allReaducers from './reducers'
import thunk from 'redux-thunk'

const store = createStore(allReaducers, applyMiddleware(thunk))
    function App() {
      return (
          <Provider store={store}>
              <RouterPaths/>

          </Provider>


      );
}

export default App;
