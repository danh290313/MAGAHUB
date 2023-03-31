import axios from "axios";
import * as cherrio from "cheerio";
import { getImageUrl } from "../utils";
import { config } from "dotenv";
import { Chapter, Comic, ComicCard, Filter, IPages } from "../types";
import { URL } from "url";
import scraper from "../services/scraper";
import { NT_URL } from "../config";
config();
export default function ntModel() {
  const NtUrl = NT_URL as string;

  if (!NtUrl) console.log("Please add NtUrl to .env file");
  const parseComic = (selector: string, data: any) => {
    const $ = cherrio.load(data);
    const comics: ComicCard[] = [];

    $(selector).each(function () {
      const name = $(this).find("figcaption a").text();

      comics.push({
        name,
      });
    });
    return comics;
  };
  const hotComic = async () => {
    try {
      const data = await scraper(NtUrl);
      return parseComic(".row .item", data);
    } catch (e) {
      console.log(e);
      return [];
    }
  };
  return {
    hotComic,
  };
}
