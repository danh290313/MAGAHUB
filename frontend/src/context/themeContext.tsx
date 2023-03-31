import { SetStateAction } from "jotai";
import {
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
} from "react";

type ITheme = [theme: string, toggleTheme: () => void];
const themeContext = createContext<ITheme | null>(null);
interface Props {
  children: ReactNode;
}
const ThemeProvider = ({ children }: Props) => {
  let [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const lcTheme = localStorage.getItem("theme") as string;
      setTheme(lcTheme);
    }
  }, []);
  return (
    <themeContext.Provider value={[theme || "dark", toggleTheme]}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => useContext(themeContext) as ITheme;
