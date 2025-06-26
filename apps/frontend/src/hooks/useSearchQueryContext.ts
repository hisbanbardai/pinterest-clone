import { useContext } from "react";
import { SearchQueryContext } from "../contexts/SearchQueryContextProvider";

export default function useSearchQueryContext() {
  const context = useContext(SearchQueryContext);

  if (!context) {
    throw new Error(
      "You are trying to use SearchQueryContext value inside a component that is not wrapped under it"
    );
  }

  return context;
}
