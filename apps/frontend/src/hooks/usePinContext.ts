import { useContext } from "react";
import { PinContext } from "../contexts/PinContextProvider";

export default function usePinContext() {
  const context = useContext(PinContext);

  if (!context) {
    throw new Error(
      "You are trying to use PinContext in a component that is not wrapped by the PinContextProvider"
    );
  }

  return context;
}
