import { createContext } from "react";
import usePin from "../hooks/usePin";
import type { TPin, TUser } from "../lib/types";

type TPinContext = {
  error: Error | null;
  isLoading: boolean;
  pin: TPin;
  user: TUser;
  savedPinCount: number;
};

export const PinContext = createContext<TPinContext | null>(null);

export default function PinContextProvider({
  id,
  children,
}: {
  id: string | undefined;
  children: React.ReactNode;
}) {
  const { error, isLoading, pin, user, savedPinCount } = usePin(id);

  return (
    <PinContext.Provider
      value={{
        error,
        isLoading,
        pin,
        user,
        savedPinCount,
      }}
    >
      {children}
    </PinContext.Provider>
  );
}
