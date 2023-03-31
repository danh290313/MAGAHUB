import axios from "axios";
import { Request, Response } from "express";
import lhModel from "../models/LhModel";
import { Filter } from "../types";
const lh = lhModel();

export const getHotComic = async (req: Request, res: Response) => {
  const hotComic = await lh.hotComic();
  if (!hotComic.length)
    return res.status(500).json({ message: "Error load hot comic" });
  return res.status(200).json({ data: hotComic });
};
export const filterComic = async (
  req: Request<{}, {}, {}, Filter>,
  res: Response
) => {
  const data = await lh.filterComic(req.query);
  if (!data?.comics)
    return res.status(500).json({ message: "Error load comic" });
  return res.status(200).json({ data: data.comics, meta: data.meta });
};
export const advancedFilterComic = async (
  req: Request<{}, {}, {}, Filter>,
  res: Response
) => {
  const data = await lh.advancedFilterComic(req.query);
  if (!data?.comics)
    return res.status(500).json({ message: "Error load comic" });
  return res.status(200).json(data);
};
export const getAllGenres = async (req: Request, res: Response) => {
  const genres = await lh.allGenres();
  if (!genres.length)
    return res.status(500).json({ message: "Error load genres" });
  return res.status(200).json({ data: genres });
};
export const getComic = async (
  req: Request<{ name: string | undefined }>,
  res: Response
) => {
  const { name } = req.params;
  // const path = req.baseUrl + req.path;
  if (!name) return res.status(500).json({ message: "no name found" });
  const comic = await lh.getComic(name);
  if (!comic) return res.status(404).json({ message: "comic not found" });
  return res.status(200).json(comic);
};
export const getChapter = async (
  req: Request<{ name: string | undefined; chapter: string | undefined }>,
  res: Response
) => {
  const { name, chapter } = req.params;
  if (!name || !chapter)
    return res.status(400).json({ message: "missing name or chapter" });
  const data = await lh.getChapter(name, chapter);
  if (!data?.pages.length)
    return res.status(404).json({ message: "chapter not found" });
  return res.status(200).json(data);
};
export const search = async (
  req: Request<{ name: string | undefined; chapter: string | undefined }>,
  res: Response
) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: "missing query" });
  const data = await lh.search(q as string);
  if (data?.comics.length === 0)
    return res.status(404).json({ message: "not found any comic" });
  return res.status(200).json(data);
};
