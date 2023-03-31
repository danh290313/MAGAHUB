import { atom, useAtom, useAtomValue } from "jotai";

// ////side bar status
export const sidebarOpen = atom(false);
export const useSideBarStatus = () => useAtom(sidebarOpen);
//header status
export const headerStatus = atom<"hide" | "show">("show");
export const useHeaderStatus = () => useAtom(headerStatus);
///header search status
export const headerSearchStatus = atom(false);
export const useHeaderSearchStatus = () => useAtom(headerSearchStatus);
