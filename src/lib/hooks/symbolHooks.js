import { useCallback, useEffect, useState } from "react";
import { SymbolsStorage } from "../constants";
import { getSymbolList } from "../services/symbolsService";

export const useSymbol = (initialState = []) => {
  // Initialize the state
  const [items, setItems] = useState(initialState);

  const setSymbol = useCallback((_items) => setItems(_items), []);
  useEffect(() => {
    debugger
    const resultItems = localStorage.getItem(SymbolsStorage);
    debugger;
    if (resultItems === null) {
      debugger;
      getSymbolList()
        .then((list) => {
          localStorage.setItem(SymbolsStorage, JSON.stringify(list));
          setItems(list);
        })
        .catch((err) => {});
    } else {
      debugger;
      setItems(JSON.parse(resultItems));
    }
  }, []);
  debugger;
    return [items, setSymbol];
};
