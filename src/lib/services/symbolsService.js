import {  symbolUrl } from "../constants";
import { fetchService } from "./webService";

export const getSymbolList = () => {
  return new Promise((resolve, reject) => {
    fetchService(symbolUrl)
      .then((result) => {
        const { success, symbols } = JSON.parse(result);
        if (success === true) {
          resolve(symbols);
        } else {
          reject()
        }
      })
      .catch((err) => {
        resolve(err)
      });
  });
};
