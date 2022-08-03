import { useCallback, useEffect, useState } from "react";
import { SymbolsStorage } from "../constants";
import { getSymbolList } from "../services/symbolsService";

export const useSymbol = (initialState = []) => {
  // Initialize the state
  const [items, setItems] = useState(initialState);

  const setSymbol = useCallback((_items) => setItems(_items), []);

  useEffect(() => {
    const resultItems = localStorage.getItem(SymbolsStorage);
    if (resultItems === null) {
      getSymbolList()
        .then((list) => {
          localStorage.setItem(SymbolsStorage, JSON.stringify(list));
          setItems(list);
        })
        .catch((err) => {});
    } else {
      setItems(JSON.parse(resultItems));
    }
  }, []);

  return [items, setSymbol];
};
