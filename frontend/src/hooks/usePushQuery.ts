import { useRouter } from "next/router";

export default function usePushQuery() {
  const router = useRouter();

  const query = {
    push: (
      query: { [key: string]: string | number },
      refreshPage?: boolean,
      isShallow?: boolean
    ) => {
      // Object.keys(query).forEach((key) => {
      //   if (!query[key]) delete query[key];
      // });

      // Object.keys(query).forEach((key) => {
      //   if (!query[key]) delete query[key];
      // });
      const queryObj = {
        ...router.query,
        ...query,
      };
      Object.keys(queryObj).forEach(
        (key) =>
          (queryObj[key] === undefined ||
            queryObj[key] === "" ||
            queryObj[key] === null) &&
          delete queryObj[key]
      );
      if (refreshPage) {
        const { page } = queryObj;
        if (page) {
          delete queryObj.page;
        }
      }

      router.replace(
        {
          pathname: router.pathname,
          query: queryObj,
        },
        undefined,
        { shallow: !!isShallow }
      );
    },
  };

  return query;
}
