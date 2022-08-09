/* eslint-disable no-debugger */
import { HistoryStorageList } from "../constants"

export const historyListAdd=(item)=>{
    const HistoryStorageListName=HistoryStorageList+new Date().toLocaleDateString().replace(/\.|[ ]/g,"")
    let histories= localStorage.getItem(HistoryStorageListName);
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
    localStorage.setItem(HistoryStorageListName,JSON.stringify(list));
    return list.slice(0)
}
export const getHistoryList =()=>{
    const HistoryStorageListName=HistoryStorageList+new Date().toLocaleDateString().replace(/\.|[ ]/g,"")
    let histories= localStorage.getItem(HistoryStorageListName);
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