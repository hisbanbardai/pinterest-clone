import usePin from "../hooks/usePin";
import { PinContext } from "./PinContext";

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
