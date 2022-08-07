import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currency';
// import logger from "redux-logger";
// import thunk from 'redux-thunk'; 

// const middleWares = [logger,thunk ];
export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
  // middleware: middleWares
});
