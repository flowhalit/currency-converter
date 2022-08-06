import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currency';
import currencyHistoryReducer from './history';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    currencyHistory: currencyHistoryReducer,
  },
});
