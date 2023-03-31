import { Request, Response } from "express";
import WatchListModel from "../models/WatchListModel";
import { Comic, extendedComic, WatchList } from "../types";
import lhModel from "../models/LhModel";
const lh = lhModel();
export default function UserController() {
  return {
    getFollows: async (req: Request, res: Response) => {
      let { userId, page } = req.query;
      if (!page || isNaN(+page)) page = "1";

      const limit = 10;
      if (!userId)
        return res
          .status(400)
          .json({ success: false, message: "missing payload" });
      const data: WatchList | null = await WatchListModel.findOne({
        userId,
      });

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "ko tim thay du lieu" });
      const resp = {
        userId,
        comics: [] as extendedComic[],
      };
      data.comics = data.comics.slice(+page * limit - limit, +page * limit);
      await Promise.all(
        data.comics.map(async (comic) => {
          const comicDetails: extendedComic | null = (await lh.getComic(
            comic.slug
          )) as Comic | null;
          const userWatchlist = await WatchListModel.findOne({
            userId,
            "comics.slug": comic.slug,
          });
          if (userWatchlist && comicDetails) {
            comicDetails.readed = userWatchlist.comics.find(
              (_comic) => !!_comic.readed && _comic.slug === comic.slug
            )?.readed;
            comicDetails.lastTimeReaded = userWatchlist.comics.find(
              (_comic) => !!_comic.readed && _comic.slug === comic.slug
            )?.lastTimeReaded;
            console.log(comicDetails);
          }
          resp.comics.push(comicDetails as extendedComic);
        })
      );
      resp.comics.sort(
        (a, b) => (b?.lastTimeReaded as number) - (a?.lastTimeReaded as number)
      );
      const meta = {
        totalPages: Math.ceil(data.comics.length / limit),
        curentPage: page,
      };
      res.json({ data: resp, meta });
    },
  };
}
