import axios from "axios";
import { Request, Response } from "express";
import ntModel from "../models/NtModel";
import { Filter } from "../types";
const nt = ntModel();

export const getHotComic = async (req: Request, res: Response) => {
  const hotComic = await nt.hotComic();
  if (!hotComic.length)
    return res.status(500).json({ message: "Error load hot comic" });
  return res.status(200).json({ data: hotComic });
};
