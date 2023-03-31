import { useRouter } from "next/router";
import { sort_options } from "~/constants";
import usePushQuery from "~/hooks/usePushQuery";
import { ComicCard } from "~/types";
import Card from "../shared/Card";
import Combobox from "../shared/Combobox";
import Pagination from "./Pagination";
type Props = {
  data: {
    data: ComicCard[];
    meta: {
      totalPage: number;
    };
  };
};

const BrowseLeftContent = ({ data }: Props) => {
  const query = usePushQuery();
  const router = useRouter();
  const { sort } = router.query;
  return (
    <div className="bg-accent text-white md:col-span-8">
      <div className="flex flex-col sm:flex-row justify-between">
        <h3 className="whitespace-nowrap p-3 text-xl">Danh sách truyện</h3>
        <Combobox
          onChange={(e) => query.push({ sort: e.target.value }, true)}
          defaultValue={sort || sort_options[0].value}
          options={sort_options}
        />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-8">
        {data.data.map((comic, key) => (
          <Card key={key} comic={comic} />
        ))}
      </div>
      <Pagination totalPages={data.meta.totalPage} />
    </div>
  );
};

export default BrowseLeftContent;
