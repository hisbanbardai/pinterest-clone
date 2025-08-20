import { useRef, useState } from "react";
import { SearchQueryContext } from "./SearchQueryContext";

export default function SearchQueryContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = inputRef.current?.value.trim();

    if (value) {
      setSearchText(value);
      // console.log(value);
    }
  }

  return (
    <SearchQueryContext.Provider
      value={{
        searchText,
        handleFormSubmit,
        inputRef,
      }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
}
