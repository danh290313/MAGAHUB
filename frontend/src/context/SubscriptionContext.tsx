import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";
import { Subscription } from "~/types";

type ContextValue = {
  subscription: Subscription | null;
  setSubscription: Dispatch<SetStateAction<Subscription | null>>;
} | null;

interface SubscriptionContextProps {
  children: ReactNode;
  value: ContextValue;
}

const SubscriptionContext = createContext<ContextValue>(null);

export const SubscriptionContextProvider = ({
  children,
  value,
}: SubscriptionContextProps) => {
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default function useSubscription() {
  return useContext(SubscriptionContext);
}
