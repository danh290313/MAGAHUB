import { GetServerSideProps } from "next";
import AdvanceFilter from "~/components/features/AdvanceFilter";
import Pagination from "~/components/features/Pagination";
import Card from "~/components/shared/Card";
import CardSection from "~/components/shared/CardSection";
import { axiosClient } from "~/services/axiosClient";
import { ComicCard, Genre } from "~/types";
type Props = {
  data: {
    meta: {
      totalPage: number | null;
    };
    comics: ComicCard[];
  };
  genres: { data: Genre[] };
};

export const Search = ({ data, genres }: Props) => {
  return (
    <div className="-mx-[4%] flex flex-col gap-4 pt-8">
      <AdvanceFilter genres={genres} />
      <CardSection title="Kết quả tìm kiếm">
        {data.comics.length === 0 ? (
          <div className="p-4 pb-8 w-full text-center">Không có kết quả</div>
        ) : (
          <>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
              {data.comics.map((comic) => (
                <Card comic={comic} key={comic.slug} />
              ))}
            </div>
            <Pagination totalPages={data.meta.totalPage as number} />
          </>
        )}
      </CardSection>
    </div>
  );
};
export default Search;
export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const {
    q,
    artist,
    status,
    sort = "new",
    accept_genres,
    reject_genres,
    page,
  } = query;
  try {
    const [{ data }, { data: genres }] = await Promise.all([
      axiosClient.get("/lhmanga/filter", {
        params: {
          q,
          artist,
          status,
          sort,
          accept_genres,
          reject_genres,
          page,
        },
      }),
      axiosClient.get("/lhmanga/genres"),
    ]);
    return {
      props: {
        data,
        genres,
      },
    };
  } catch (err) {
    return {
      props: {
        data: null,
      },
    };
  }
};
