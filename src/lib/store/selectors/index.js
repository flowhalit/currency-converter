export const selectSearchFrom = (state) => state.currency.search.from
export const selectSearchTo = (state) => state.currency.search.to
export const selectSearchDate = (state) => state.currency.search.date
export const selectSearchAmount = (state) => state.currency.search.amount
export const selectSearch = (state) => state.currency.search
export const selectSearchText = (state) => state.currency.text
export const selectResult = (state) => state.currency.result

export const selectSymbols = (state) => state.currency.symbols
export const selectFromSymbols = (state) => state.currency.fromSymbols
export const selectToSymbols = (state) => state.currency.toSymbols
export const selectStatus = (state) => state.currency.status
export const selectHistories = (state) => state.currency.result.histories