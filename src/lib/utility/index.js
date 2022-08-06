
export const getToAutoComplete = (items,value = null) => {
    return items 
              ?Object.keys(items)
                     .filter((key) => (value === null) || key !== value)
                      .map((item) => ({ label: items[item], value: item }))
        :[]
  };