import { createContext, useState } from "react";

export const CrosswordContext = createContext(null);

// children - компоненты, которым предоставляется информация
export const CrosswordProvider = ({children}) => {
  const [curCrossword, setCrossword] = useState(null);
  const updateCrossword = (crossword, cb) => {
    setCrossword(crossword);
    cb();
  }

  const value = {curCrossword, updateCrossword};
  return <CrosswordContext.Provider value={value}>
    {children} 
  </CrosswordContext.Provider>
}