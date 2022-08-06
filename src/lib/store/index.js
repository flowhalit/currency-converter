import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currency';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});
