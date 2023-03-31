import { useState, useEffect, FormEvent } from "react";
import { GoSearch } from "react-icons/go";
import { FiFilter } from "react-icons/fi";
import { FaTimes, FaCheck } from "react-icons/fa";
import { BiSquareRounded } from "react-icons/bi";
import { status_options, sort_options } from "~/constants";
import { Filter, Genre } from "~/types";
import usePushQuery from "~/hooks/usePushQuery";
import { useRouter } from "next/router";
import CardSection from "../shared/CardSection";

type Props = {
  genres: { data: Genre[] };
};

const AdvanceFilter = ({ genres }: Props) => {
  const [openFilter, setOpenFilter] = useState(false);
  const { query } = useRouter();
  const [filter, setFilter] = useState<Filter>(query);
  const [genresStatus, setGenresStatus] = useState(
    Array.from(genres.data, (x) => {
      if (
        (query?.accept_genres as string)
          ?.split(",")
          .includes(
            String(
              (genres.data.findIndex(
                (gen) => gen.value === x.value
              ) as number) + 1
            )
          )
      )
        return 1;
      else if (
        (query?.reject_genres as string)
          ?.split(",")
          .includes(
            String(
              (genres.data.findIndex(
                (gen) => gen.value === x.value
              ) as number) + 1
            )
          )
      )
        return -1;
      else return 0;
    })
  ); //0: normal, 1 accept, -1 reject
  const handleChangeGenres = (index: number) => {
    const newGenres = genresStatus;
    newGenres[index] =
      genresStatus[index] === 0 ? 1 : genresStatus[index] === 1 ? -1 : 0;
    const transformGen: {
      acceptGen?: string;
      rejectGen?: string;
    } = genresStatus.reduce(
      (acc, current, index) => {
        if (current === 1)
          return { ...acc, acceptGen: acc.acceptGen + (index + 1) + "," };
        else if (current === -1)
          return { ...acc, rejectGen: acc.rejectGen + (index + 1) + "," };
        return acc;
      },
      {
        acceptGen: "",
        rejectGen: "",
      }
    );
    setFilter((prev) => ({
      ...prev,
      accept_genres: transformGen?.acceptGen?.slice(0, -1),
      reject_genres: transformGen?.rejectGen?.slice(0, -1),
    }));
  };
  useEffect(() => {}, [genresStatus]);
  const pushquery = usePushQuery();
  const handlePushQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pushquery.push({ ...filter });
  };
  return (
    <CardSection title="Tìm kiếm">
      <div className="p-4">
        <div>
          <form onSubmit={handlePushQuery} className="flex py-4">
            <input
              className="w-full px-2 py-1 border-[1px] border-yellow-500 bg-transparent"
              placeholder="Tối thiểu 2 kí tự"
              value={filter.q}
              onChange={(e) => setFilter({ ...filter, q: e.target.value })}
            />
            <button
              type="submit"
              className="flex bg-yellow-500 text-white font-bold whitespace-nowrap items-center p-2"
            >
              <GoSearch className="w-5 h-5 mr-3" />
              Tìm kiếm
            </button>
          </form>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <span
                onClick={() => setOpenFilter(!openFilter)}
                className="ml-auto  whitespace-nowrap flex cursor-pointer select-none "
              >
                <FiFilter className="w-5 h-5 mr-3 translate-y-1" />
                Tìm kiếm nâng cao
              </span>
              {openFilter && (
                <div className="flex flex-col gap-3 my-4">
                  <div className="">
                    <h2 className="mb-2">Tác giả</h2>
                    <input
                      value={filter.artist}
                      onChange={(e) =>
                        setFilter({ ...filter, artist: e.target.value })
                      }
                      className="w-full border-[1px] p-2 border-yellow-500 bg-transparent focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="Có thể bỏ trống"
                    />
                  </div>
                  <div className="">
                    <h2 className="mb-2">Tình trạng</h2>
                    <select
                      className="w-full border-[1px] p-2 border-yellow-500 bg-transparent focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="Có thể bỏ trống"
                      value={filter.status}
                      onChange={(e) => {
                        if (e.target.value === "Tất cả") {
                          const { status, ...rest } = filter;
                          setFilter(rest);
                        } else setFilter({ ...filter, status: e.target.value });
                      }}
                    >
                      <option className="dark:bg-accent">Tất cả</option>
                      {status_options.map((opt) => (
                        <option
                          value={opt.replaceVal}
                          key={opt.replaceVal}
                          className="dark:bg-accent"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="">
                    <h2 className="mb-2">Sắp xếp</h2>
                    <select
                      className="w-full border-[1px] p-2 border-yellow-500 bg-transparent focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="Có thể bỏ trống"
                      value={filter.sort}
                      onChange={(e) =>
                        setFilter({ ...filter, sort: e.target.value })
                      }
                    >
                      {sort_options.map((opt) => (
                        <option
                          key={opt.value}
                          className="dark:bg-accent"
                          value={opt.value}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
            {openFilter && (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 select-none">
                {genres.data.map((genre, index) => (
                  <div
                    key={genre.value}
                    className="flex items-center whitespace-nowrap text-xs md:text-sm gap-2"
                    onClick={() => handleChangeGenres(index)}
                  >
                    {/* <input type="checkbox" id={genre.value} className="w-4 h-4" /> */}

                    {genresStatus[index] === 1 ? (
                      <FaCheck className="w-5 h-5 flex-shrink-0 text-green-500" />
                    ) : genresStatus[index] === -1 ? (
                      <FaTimes className="w-5 h-5 flex-shrink-0 text-red-500" />
                    ) : (
                      <BiSquareRounded className="w-5 h-5 flex-shrink-0" />
                    )}

                    <label htmlFor={genre.value}>{genre.label}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </CardSection>
  );
};

export default AdvanceFilter;
