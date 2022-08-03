const myHeaders = new Headers();
const BASEURL = process.env.REACT_APP_API_BASE_URL;
myHeaders.append("apikey", process.env.REACT_APP_API_KEY);
const requestOptions ={
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
export const fetchService = (url)=>{
    return new Promise((resolve,reject)=>{
      debugger
        fetch(BASEURL + url, requestOptions)
          .then(response => response.text())
          .then(result => resolve(result))
          .catch(error => reject(error));
    })
}