import { useContext } from "react";
import { CrosswordContext } from "../hoc/crosswordProvider";

export function useCrossword(){
  return useContext(CrosswordContext);
}
