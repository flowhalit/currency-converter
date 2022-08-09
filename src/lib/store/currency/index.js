/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { ConvertHistoryStorage, SymbolsStorage } from '../../constants';
import { CURRENCY_API_CONVERT, CURRENCY_API_SYMBOLS_GETLIST } from '../../constants/redux';
import { getSymbolList} from '../../services/symbolsService'
import { getApiMoneyConvert} from '../../services/convertService'
import { getToAutoComplete } from '../../utility';
import { selectSearch } from '../selectors';
import { getHistoryList, historyListAdd } from '../../storage';
export * from '../selectors'
const initialState = {
    status:{
      loading:true,
      message:"",
      isShow:false
    },
    result:{
      convert:{
        info:{
          rate:0
        },
        query:{
          amount:0
        }
      },
      totalAmount:0,
      histories:[]
    },
    symbols:{},
    fromSymbols:[],
    toSymbols:[],
    text:{
      from:"",
      to:""
    },
    search:{
      from:null,
      to:null,
      amount:0
    }
};

export const getSymbolListAsync = createAsyncThunk(
  CURRENCY_API_SYMBOLS_GETLIST,
  async () => {
    return await (()=>{
      return new Promise((resolve,reject)=>{
        const resultItems = localStorage.getItem(SymbolsStorage);
        if (resultItems === null) {
          getSymbolList()
            .then((list) => {
              localStorage.setItem(SymbolsStorage, JSON.stringify(list));
              resolve(list);
            })
            .catch((err) => {
              reject(err)
            });
        } else {
          let _items =JSON.parse(resultItems);
          resolve(_items)
        }
      })
    })()
  }
);
export const getConvertToMoneyAsync = createAsyncThunk(
  CURRENCY_API_CONVERT,
  async (_,{ getState }) => {
    const search = selectSearch(getState())
    return await (()=>{
      return new Promise((resolve,reject)=>{
        let historyLists = localStorage.getItem(ConvertHistoryStorage);
        if(historyLists!==null){
          historyLists= JSON.parse(historyLists);
        }
        if (historyLists === null || historyLists && historyLists[search["from"]]===undefined || historyLists && Object.keys(historyLists).length===0) {
          getApiMoneyConvert(search)
            .then((infoData) => {
              let storageList={}
              if(historyLists && historyLists[search["from"]]===undefined){
                storageList={...historyLists}
              }
              if(infoData){
                storageList[search["from"]]=infoData
              }
              localStorage.setItem(ConvertHistoryStorage, JSON.stringify(storageList));
              resolve({result:storageList[search["from"]],search:{
                ...search,
                date:moment().format("DD.MM.YYYY HH:mm:ss"),
                timestamps:moment().valueOf()
              }});
            })
            .catch((err) => {
              reject(err)
            });
        } else {
          resolve({ result:historyLists[[search["from"]]],search:{
            ...search,
            date:moment().format("DD.MM.YYYY HH:mm:ss"),
            timestamps:moment().valueOf()
          }})
        }
      })
    })()
  }
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setStatus:(state,{payload:{param,status}})=>{
      state.status={
        ...status,
        ...param
      }
    },
    setSwaps:(state,{payload:{symbols,search,text,result}})=>{
      state.text.from=text.to;
      state.text.to=text.from;
      state.search.from=search.to;
      state.search.to=search.from;
      state.fromSymbols=getToAutoComplete(symbols,search.from)
      state.toSymbols=getToAutoComplete(symbols,search.to)
      state.search.amount=result.totalAmount;
      state.result.totalAmount=0;
      state.result.convert.info.rate=0
    },
    setSearchFrom: (state, {payload:{ data,symbols,search}}) => {
      let from =null;
      state.text.from=data
      Object.keys(symbols).filter(x=>{
        if(symbols[x]===data){
          from=x
        }
      })
      state.search.from=from;
      state.fromSymbols=getToAutoComplete(symbols,search.to)
      state.toSymbols=getToAutoComplete(symbols,from)
      state.result.totalAmount=0;
      state.result.convert.info.rate=0
    },
    setSearchTo: (state, {payload:{ data,symbols,search}}) => {
      let to=null
      state.text.to=data
      Object.keys(symbols).filter(x=>{
        if(symbols[x]===data){
          to=x
        }
      })
      state.search.to=to;
      state.fromSymbols=getToAutoComplete(symbols,to)
      state.toSymbols=getToAutoComplete(symbols,search.from)
      state.result.totalAmount=0;
      state.result.convert.info.rate=0
    },
    setAmount: (state, { payload:{amount,result}}) => {
      state.search.amount=(amount || 0);
      let totalAmount=parseFloat((result.convert.info.rate || 0)* (amount || 0));
      state.result.totalAmount =totalAmount?totalAmount.toFixed(5):0;
    },
    getHistories:(state,_)=>{
      state.result.histories=getHistoryList();
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getConvertToMoneyAsync.pending, (state) => {
        state.status.loading = false;
      })
      .addCase(getConvertToMoneyAsync.fulfilled, (state, {payload:{result,search}}) => {
        state.result.convert={
          ...result
        }
        let totalAmount=parseFloat((result.info.rate || 0)* (search.amount || 0));
        state.result.totalAmount =totalAmount?totalAmount.toFixed(5):0;
        state.status.loading = true;
        state.result.histories=historyListAdd({
          ...search,
          date:search.date,
          timestamps:search.timestamps,
          amount:search.amount,
          totalAmount:state.result.totalAmount,
        })
      })
      .addCase(getConvertToMoneyAsync.rejected, (state) => {
        state.status.loading = true;
      })
      .addCase(getSymbolListAsync.pending, (state) => {
        state.status.loading = false;
      })
      .addCase(getSymbolListAsync.fulfilled, (state, action) => {
        state.status.loading = true;
        state.symbols= action.payload? {...action.payload} : {};
        state.fromSymbols=getToAutoComplete(state.symbols,null)
        state.toSymbols=getToAutoComplete(state.symbols,null)
      })
      
      .addCase(getSymbolListAsync.rejected, (state) => {
        state.status.loading = true;
        state.symbols={};
        state.fromSymbols=getToAutoComplete({},null)
        state.toSymbols=getToAutoComplete({},null)
      });
  },
});

export const {
   setSearchFrom,setSearchTo, setStatus,setSwaps,setAmount,getHistories
  } = currencySlice.actions;

export const getListSymbolListAsync = () =>async (dispatch) => {
      await dispatch(getSymbolListAsync());
};
export const getConvertToMoneyActionAsync = (payload) =>async (dispatch) => {
    await dispatch(getConvertToMoneyAsync(payload));
};


export default currencySlice.reducer;
