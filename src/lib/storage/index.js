/* eslint-disable no-debugger */
import { HistoryStorageList } from "../constants"

export const historyListAdd=(item)=>{
    let histories= localStorage.getItem(HistoryStorageList);
    let list= null
    if(histories===null || histories==="null"){
        list=[];
    }else{
        list= JSON.parse(histories) || [];
        if(Array.isArray(list)===false){
            list=[]
        }
    }
    list.push({
        ...item,
        id:list.length+1
    });
    localStorage.setItem(HistoryStorageList,JSON.stringify(list));
    return list.slice(0)
}
export const getHistoryList =()=>{
    let histories= localStorage.getItem(HistoryStorageList);
    let list= null
    if(histories===null || histories==="null"){
        list=[];
    }else{
        list= JSON.parse(histories) || [];
        if(Array.isArray(list)===false){
            list=[]
        }
    }
    return list.slice(0)
}