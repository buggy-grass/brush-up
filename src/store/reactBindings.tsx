import React, { createContext, useContext } from "react";
import { store as appStore } from "./store";
import { useSyncExternalStore } from "react";

const StoreContext = createContext(appStore);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <StoreContext.Provider value={appStore}>{children}</StoreContext.Provider>;
}

export function useAppDispatch() {
  const store = useContext(StoreContext);
  return store.dispatch;
}

export function useAppSelector<T>(selector: (state: any) => T): T {
  const store = useContext(StoreContext);
  const getSnapshot = () => selector(store.getState());
  const subscribe = (listener: () => void) => store.subscribe(listener);
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}


