import { createContext } from "react";
import type { TPin, TUser } from "../lib/types";

type TPinContext = {
  error: Error | null;
  isLoading: boolean;
  pin: TPin;
  user: TUser;
  savedPinCount: number;
};

export const PinContext = createContext<TPinContext | null>(null);
