import { convertUrl } from "../constants";
import { webServiceWithParam } from "./webService";

export const getApiMoneyConvert = (params) => {
  return new Promise((resolve, reject) => {
    webServiceWithParam(convertUrl,params)
      .then((converResult) => {
        const { success, info,query,result } = JSON.parse(converResult);
        if (success === true) {
          resolve({info,query,result});
        } else {
          reject(false);
        }
      })
      .catch((err) => {
        resolve(err);
      });
  });
};
