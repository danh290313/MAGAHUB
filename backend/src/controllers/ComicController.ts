import { Request, Response } from "express";
import { comic_status } from "../constant";
import Comic from "../models/ComicModel";
import { IComicFilter, QuerryManga } from "../types";
import { isNumber } from "../utils";

// type Status = "Hoàn thành" | "Đang tiến hành";
export const getNewComic = async (
  req: Request<{}, {}, {}, QuerryManga>,
  res: Response
) => {
  let { limit, page } = req.query;
  if (!page) page = "1";
  if (!limit) limit = "30";
  if (!isNumber([limit, page]))
    return res.status(400).json({
      status: "error",
      message: "query is not valid",
    });
  let comics = await Comic.find()
    .limit(+limit)
    .skip(+limit * +page - +limit)
    .lean();
  const meta = {
    total_pages: Math.ceil((await Comic.count()) / +limit),
  };
  if (comics.length === 0)
    return res
      .status(404)
      .json({ status: "error", message: "error get comics" });
  return res.status(200).json({ status: "success", data: comics, meta });
};
export const getFilterComic = async (
  req: Request<{}, {}, {}, IComicFilter>,
  res: Response
) => {
  let { genres, limit = "36", page = "1", status } = req.query;
  let query: {
    "genres.value"?: string;
    status?: string;
  } = {};
  if (genres) query["genres.value"] = genres;
  if (status)
    query["status"] = status === "0" ? comic_status[0] : comic_status[1];
  const [count, comics] = await Promise.all([
    Comic.find(query).count(),
    Comic.find(query)
      .limit(+limit)
      .skip(+limit * +page - +limit)
      .lean(),
  ]);
  const meta = {
    total_pages: Math.ceil(count / +limit),
  };
  if (comics.length === 0)
    return res.status(404).json({ message: "not found any comic" });
  return res.status(200).json({ data: comics, meta });
};
