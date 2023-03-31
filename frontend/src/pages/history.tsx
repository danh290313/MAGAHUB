import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { useReadLocalStorage } from "usehooks-ts";
import ListView from "~/components/features/ListView";
import ListIcon from "~/components/icons/ListIcon";
import LListIcon from "~/components/icons/LListIcon";
import SListIcon from "~/components/icons/SListIcon";
import ClientOnly from "~/components/shared/ClientOnly";
import Head from "~/components/shared/Head";
import Section from "~/components/shared/Section";
import TabSelect from "~/components/shared/TabSelect";
import useFollow from "~/hooks/useFollow";
import { Comic, VistedComic } from "~/types";

const tabIcons: ReactNode[] = [
  <ListIcon style="w-5 h-5" key={1} />,
  <LListIcon style="w-5 h-5" key={2} />,
  <SListIcon style="w-5 h-5" key={3} />,
];
const HistoryPage: NextPage = () => {
  const { data: session, status } = useSession();
  const [viewType, setViewType] = useState(0);
  const visitedComic =
    (useReadLocalStorage("visited-comics") as VistedComic[]) || [];
  const [comics, setComics] = useState<VistedComic[]>([]);
  useEffect(() => {
    if (visitedComic) {
      setComics(visitedComic);
    }
  }, []);
  return (
    <ClientOnly>
      {session?.user?.name && (
        <Head title={`Lịch sử - ${session?.user?.name} | Manga hub`} />
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex flex-col w-[90%] max-w-[1300px] mx-auto">
        <Section title="Lịch sử đọc" style="mx-auto" />
        <div className="ml-auto">
          <TabSelect selections={tabIcons} selectActions={setViewType} />
        </div>
        <Section>
          <ListView
            isLoading={comics.length === 0}
            comics={comics}
            viewType={viewType}
          />
        </Section>
      </div>
    </ClientOnly>
  );
};
export default HistoryPage;
