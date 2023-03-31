import { ReactNode } from "react";
import { useTheme } from "~/context/themeContext";
import Footer from "../patials/Footer";
import Header from "../patials/Header";
import ScrollToTopBtn from "../shared/ScrollToTopBtn";
type Props = {
  children: ReactNode;
};

const ReadingLayout = ({ children }: Props) => {
  const [theme] = useTheme();

  return (
    <div className={`${theme} min-h-screen relative`}>
      <Header />
      <main className="dark:bg-[url('/static/media/landing_page_bg.png')] bg-cover  min-h-screen">
        <div className="mx-auto w-full max-w-[1300px] pb-20 md:pb-40">
          {children}
        </div>
      </main>
      <ScrollToTopBtn />
      <Footer />
    </div>
  );
};

export default ReadingLayout;
