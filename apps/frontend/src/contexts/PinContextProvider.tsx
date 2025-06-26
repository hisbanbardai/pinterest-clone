import { createContext } from "react";
import usePin from "../hooks/usePin";

type TPinContext = {
  error: Error | null;
  isLoading: boolean;
  pin: {};
  user: {};
};

export const PinContext = createContext<TPinContext | null>(null);

export default function PinContextProvider({
  id,
  children,
}: {
  id: string | undefined;
  children: React.ReactNode;
}) {
  const { error, isLoading, pin, user } = usePin(id);

  return (
    <PinContext.Provider
      value={{
        error,
        isLoading,
        pin,
        user,
      }}
    >
      {children}
    </PinContext.Provider>
  );
}
