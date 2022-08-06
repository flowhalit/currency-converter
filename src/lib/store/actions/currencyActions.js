/* eslint-disable no-unused-vars */
import { selectSearch, selectSearchText, selectSymbols, setSearchFrom, setSearchTo, setStatus,setSwaps,setAmount, selectResult, selectStatus } from "../currency";

export const setStatusAction = (payload) => (dispatch,getState) => {
  const status = selectStatus(getState())
  dispatch(setStatus({param:payload,status}));
};
export const setSearchToAction = (payload) => (dispatch,getState) => {
  const symbols= selectSymbols(getState());
  const search= selectSearch(getState());
  dispatch(setSearchTo({
    data:payload,
    symbols,
    search
  }));
};
export const setSearchFromAction = (payload) => (dispatch,getState) => {
  const symbols= selectSymbols(getState());
  const search= selectSearch(getState());

  dispatch(setSearchFrom({
    data:payload,
    symbols,
    search
  }));
};
export const setSwapAction = (payload) => (dispatch,getState) => {
  const symbols= selectSymbols(getState());
  const search= selectSearch(getState());
  const text= selectSearchText(getState());
  const result= selectResult(getState());
  dispatch(setSwaps({
    text,
    symbols,
    search,
    result
  }));
};
export const setAmountAction = (payload) => (dispatch,getState) => {
  const result= selectResult(getState());
  dispatch(setAmount({
    amount:payload,
    result
  }));
};