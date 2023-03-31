import { GetServerSideProps } from "next";
import React from "react";
import BrowseLeftContent from "~/components/features/BrowseLeftContent";
import BrowseRightContent from "~/components/features/BrowseRightContent";
import { REVALIDATE_TIME } from "~/constants";
import { axiosClient } from "~/services/axiosClient";

type Props = {
  data: any;
};

const BrowsePage = ({ data }: Props) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 dark:text-white w-full">
      <BrowseLeftContent data={data} />
      <BrowseRightContent />
    </div>
  );
};

export default BrowsePage;
export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${REVALIDATE_TIME}, stale-while-revalidate=${
      REVALIDATE_TIME * 6
    }`
  );
  try {
    const {
      dangtienhanh,
      hoanthanh,
      sort = "az",
      tamngung,
      page,
      genre,
    } = query;
    const { data } = await axiosClient.get("/lhmanga", {
      params: {
        dangtienhanh,
        hoanthanh,
        sort,
        tamngung,
        page,
        genre,
      },
    });
    if (!data.data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
