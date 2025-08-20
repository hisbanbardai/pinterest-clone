import { createContext } from "react";

type TSearchQueryContext = {
  searchText: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const SearchQueryContext = createContext<TSearchQueryContext | null>(
  null
);
