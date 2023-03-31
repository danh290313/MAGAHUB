import { status_options } from "~/constants";
import { ChangeEvent, useState, useEffect, memo } from "react";
import usePushQuery from "~/hooks/usePushQuery";
import { Genre } from "~/types";
import { axiosClient } from "~/services/axiosClient";
import { useRouter } from "next/router";
type Props = {};

const BrowseRightContent = (props: Props) => {
  const router = useRouter();
  const {
    dangtienhanh = "0",
    tamngung = "0",
    hoanthanh = "0",
  } = router.query as {
    dangtienhanh: string;
    tamngung: string;
    hoanthanh: string;
  };
  const [status, setStatus] = useState({
    dangtienhanh,
    tamngung,
    hoanthanh,
  });
  const [genres, setGenres] = useState<Genre[]>([]);
  const query = usePushQuery();
  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus({ ...status, [e.target.value]: e.target.checked ? "1" : "0" });
  };
  useEffect(() => {
    (async () => {
      const { data } = await axiosClient.get("lhmanga/genres");
      setGenres(data.data);
    })();
  }, []);

  return (
    <div className="flex flex-col gap-4 md:col-span-4 text-white">
      <div className="flex flex-col bg-accent  select-none">
        <h3 className="whitespace-nowrap p-3 text-xl">Tình trạng</h3>
        <div className="p-4 flex flex-col gap-2">
          {status_options.map((opt) => (
            <div
              key={opt.value}
              className="whitespace-nowrap flex gap-4 items-center"
            >
              <input
                id={opt.value}
                type={"checkbox"}
                name="status"
                value={opt.value}
                //@ts-ignore
                checked={status[opt.value] === "1"}
                className="w-4 h-4 accent-green-500 caret-green-300 marker:text-blue-600 "
                onChange={handleChangeStatus}
              />
              <label htmlFor={opt.value}>{opt.label}</label>
            </div>
          ))}
          <button
            className="mt-4 text-black bg-yellow-500 w-full p-3 rounded-lg"
            onClick={() => query.push(status)}
          >
            Áp dụng
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-accent  select-none">
        <h3 className="whitespace-nowrap p-3 text-xl">Thể loại</h3>
        <div className="p-4 flex flex-wrap gap-2">
          {genres?.map((genre) => (
            <span
              key={genre.value}
              className="hover:text-gray-500 cursor-pointer"
              onClick={() => query.push({ genre: genre.value })}
            >
              {genre.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(BrowseRightContent);
