/* eslint-disable no-undef */
const myHeaders = new Headers();
const BASEURL = process.env.REACT_APP_API_BASE_URL;
myHeaders.append("apikey", process.env.REACT_APP_API_KEY);
const requestOptions ={
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
export const webService = (url)=>{
    return new Promise((resolve,reject)=>{
        fetch(BASEURL + url, requestOptions)
          .then(response => response.text())
          .then(result => resolve(result))
          .catch(error => reject(error));
    })
}
export const webServiceWithParam = (url,params)=>{
    return new Promise((resolve,reject)=>{
        fetch(BASEURL + url+"?"+(new URLSearchParams(params).toString()), requestOptions)
          .then(response => response.text())
          .then(result => resolve(result))
          .catch(error => reject(error));
    })
}