/* eslint-disable no-unused-vars */
import { webService } from "../../services/webService";
import { symbolUrl } from "../../constants";
// A mock function to mimic making an async request for data
export function fetchSymbols() {
  return new Promise((resolve) => {
    webService(symbolUrl)
      .then((result) => {
        try {
          const { success, symbols } = JSON.parse(result);
          if (success === true) {
            resolve(symbols);
          } else {
            // reject({error:"No Content"})
          }
        } catch (error) {
          // reject(...error)
        }
      })
      .catch((err) => {
        // reject(err)
      });
  });
}
