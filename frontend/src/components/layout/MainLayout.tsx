import { ReactNode } from "react";
import { useTheme } from "~/context/themeContext";
import Footer from "../patials/Footer";
import Header from "../patials/Header";
type Props = {
  children: ReactNode;
  footer?: boolean;
  header?: boolean;
};

const MainLayout = ({ children, footer = true, header = true }: Props) => {
  const [theme] = useTheme();

  return (
    <div className={`${theme} min-h-screen relative`}>
      {header && <Header />}

      <main className="dark:bg-[url('/static/media/landing_page_bg.png')] bg-cover  min-h-screen">
        <div className="mx-auto w-[90%] max-w-[1300px] pb-20 md:pb-40">
          {children}
        </div>
      </main>
      {footer && <Footer />}
    </div>
  );
};

export default MainLayout;
