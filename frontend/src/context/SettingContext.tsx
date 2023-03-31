import { createContext, useContext, ReactNode } from "react";
import { Chapter } from "~/types";
interface ReadingContextType {
  currentChapter?: Chapter;
}
interface Props {
  children: ReactNode;
  value: ReadingContextType;
}
const settingContext = createContext<ReadingContextType | null>(null);
const SettingContextProvider = ({ children, value }: Props) => {
  return (
    <settingContext.Provider value={value}>{children}</settingContext.Provider>
  );
};

export default SettingContextProvider;
export const useSetting = () => useContext(settingContext);
