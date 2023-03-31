import axios from "axios";
import * as cherrio from "cheerio";
import { getImageUrl } from "../utils";
import { config } from "dotenv";
import { Chapter, Comic, ComicCard, Filter, IPages } from "../types";
import { URL } from "url";
import { BASE_URL, LH_URL } from "../config";
config();
export default function lhModel() {
  const lhUrl = LH_URL as string;
  const baseUrl = BASE_URL;
  if (!lhUrl) console.log("Please add lhUrl to .env file");
  if (!baseUrl) console.log("Please Add baseUrl to .env file");
  const parseComic = (selector: string, data: any) => {
    const $ = cherrio.load(data);
    const comics: ComicCard[] = [];

    $(selector).each(function () {
      const name = $(this).find(".series-title > a").attr("title");
      const newChap = $(this).find(".chapter-title > a").attr("title");
      const image = $(this).find(".content.img-in-ratio").attr("style");
      const hot = $(this).find(".badge-danger").text();
      const slug = $(this)
        .find(".thumb-wrapper > a")
        .attr("href")
        ?.split("truyen-tranh/")[1];
      const newChapSlug = $(this)
        .find(".chapter-title > a")
        .attr("href")
        ?.split((slug as string) + "/")[1];
      const link = baseUrl + "/lhmanga/comic/" + slug;
      comics.push({
        name,
        newChap,
        image: getImageUrl(image),
        hot,
        link,
        slug,
        newChapSlug,
      });
    });
    return comics;
  };
  const hotComic = async () => {
    try {
      const { data } = await axios.get(lhUrl);
      return parseComic(".owl-item", data);
    } catch (e) {
      console.log(e);
      return [];
    }
  };
  const filterComic = async ({
    dangtienhanh,
    hoanthanh,
    sort = "update",
    tamngung,
    page,
    genre,
  }: Filter) => {
    try {
      let link = genre ? "/the-loai/" + genre : "/danh-sach";
      const { data } = await axios.get(lhUrl + link, {
        params: {
          dangtienhanh,
          hoanthanh,
          sort,
          tamngung,
          page,
        },
      });

      const $ = cherrio.load(data);
      const comics: ComicCard[] = parseComic(".thumb-item-flow", data);
      const lastPageLink = $("main .pagination_wrap > a").last().attr("href");
      let url: URL | null = null;
      if (lastPageLink) url = new URL(lastPageLink);
      return {
        meta: { totalPage: url ? Number(url.searchParams.get("page")) : null },
        comics,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const advancedFilterComic = async ({
    status,
    sort,
    accept_genres,
    reject_genres,
    q,
    page,
    artist,
  }: any) => {
    try {
      const { data } = await axios.get(lhUrl + "/tim-kiem", {
        params: {
          artist,
          status,
          sort,
          accept_genres,
          reject_genres,
          q,
          page,
        },
      });
      const $ = cherrio.load(data);
      const comics: ComicCard[] = parseComic(".thumb-item-flow", data);
      const lastPageLink = $("main .pagination_wrap > a").last().attr("href");
      let url: URL | null = null;
      if (lastPageLink) url = new URL(lastPageLink);
      return {
        meta: { totalPage: url ? Number(url.searchParams.get("page")) : null },
        comics,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const allGenres = async () => {
    try {
      const { data } = await axios.get(lhUrl);
      const $ = cherrio.load(data);
      let genres: {
        value: string;
        label: string;
      }[] = [];
      $(".dropdown-item.genres-item").each(function () {
        genres.push({
          label: $(this).text(),
          value: $(this).attr("href")?.split("the-loai/")[1] as string,
        });
      });
      return genres;
    } catch (e) {
      return [];
    }
  };
  const getComic = async (slug: string): Promise<Comic | null> => {
    const path: string = baseUrl + "/lhmanga/comic/" + slug + "/";

    try {
      const { data } = await axios.get(lhUrl + "/truyen-tranh/" + slug);
      const $ = cherrio.load(data);
      const name = $(".series-name > a").text();
      const image = getImageUrl(
        $(".section-body .series-cover div.img-in-ratio").attr("style")
      );
      // const seriesInformation: any = [];
      let otherName;
      let genres;
      let author;
      let status;
      $(".series-information .info-item").each(function () {
        const name = $(this).find(".info-name").text();

        const value:
          | {
              label: string;
              link: string;
              slug: string;
              replaceVal?: string;
            }[] = [];
        if (name === "Thể loại:") {
          $(this)
            .find(".info-value > a")
            .each(function () {
              const label = $(this).text() as string;
              const link = $(this).attr("href") as string;
              const slug = link.split("the-loai/")[1] as string;
              value.push({ link, label, slug });
            });
        } else if (name === "Tác giả:")
          $(this)
            .find(".info-value")
            .each(function () {
              const label = $(this).text() as string;
              const link = $(this).find("a").attr("href") as string;
              const slug = link?.split("tac-gia/")[1] as string;
              value.push({ link, label, slug });
            });
        else if (name === "Tình trạng:")
          $(this)
            .find(".info-value")
            .each(function () {
              const label = $(this).text() as string;
              const link = $(this).find("a").attr("href") as string;
              let slug = link?.split(".net/")[1] as string;
              // console.log({ slug });
              slug =
                slug === "tinh-trang-dang-tien-hanh"
                  ? "dangtienhanh=1&tamngung=0&hoanthanh=0"
                  : slug === "tinh-trang-da-hoan-thanh"
                  ? "dangtienhanh=0&tamngung=0&hoanthanh=1"
                  : "dangtienhanh=0&tamngung=1&hoanthanh=0";
              value.push({ link, label, slug });
            });
        else
          $(this)
            .find(".info-value")
            .each(function () {
              const label = $(this).text() as string;
              const link = $(this).find("a").attr("href") as string;
              const slug = link?.split(".net/")[1] as string;
              value.push({ link, label, slug });
            });
        switch (name) {
          case "Tên khác:":
            otherName = value;
            break;
          case "Thể loại:":
            genres = value;
            break;
          case "Tác giả:":
            author = value;
            break;
          case "Tình trạng:":
            status = value;
            break;
        }
      });
      const statisticValue: any = [];
      $(".row.statistic-list")
        .find(".statistic-item")
        .each(function () {
          statisticValue.push({
            name: $(this).find(".statistic-name").text(),
            value: $(this).find(".statistic-value").text(),
          });
        });
      const summary = $(".summary-content").text();
      const chapters: Comic["chapters"] = [];
      $(".list-chapters.at-series > a").each(function () {
        chapters.push({
          link: path + ($(this).attr("href") as string).split(slug + "/")[1],
          title: $(this).find(".chapter-name").text() as string,
          time: $(this).find(".chapter-time").text() as string,
          slug: ($(this).attr("href") as string).split(slug + "/")[1] as string,
        });
      });
      return {
        name,
        statisticValue,
        summary,
        // seriesInformation,
        chapters,
        image,
        otherName,
        genres,
        author,
        status,
        slug,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  const getChapter = async (slug: string, chapter: string) => {
    try {
      const { data } = await axios.get(
        lhUrl + "/truyen-tranh/" + slug + "/" + chapter
      );
      const $ = cherrio.load(data);
      const pages: IPages = [];
      $("#chapter-content > img").each(function (index) {
        pages.push({
          id: index,
          src: $(this).attr("src") || ($(this).attr("data-src") as string),
        });
      });
      const comic = await getComic(slug);
      return {
        allChapters: comic?.chapters,
        comicSlug: comic?.slug,
        currentChapter: {
          slug: chapter,
          title: comic?.chapters.find((chap) => chap.slug === chapter)?.title,
        },
        genres: comic?.genres,
        image: comic?.image,
        name: comic?.name,
        pages,
        summary: comic?.summary,
      } as Chapter;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  const search = async (q: string) => {
    try {
      const { data } = await axios.get(lhUrl + "/tim-kiem?q=" + q);
      const $ = cherrio.load(data);

      const comics = parseComic(".thumb-item-flow", data);
      const lastPageLink = $(".pagination_wrap > a").last().attr("href");
      let url: URL | null = null;
      if (lastPageLink) url = new URL(lastPageLink);
      return {
        comics,
        meta: { totalPage: url ? Number(url.searchParams.get("page")) : null },
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  return {
    hotComic,
    filterComic,
    allGenres,
    getComic,
    getChapter,
    advancedFilterComic,
    search,
  };
}
