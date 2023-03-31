// export interface Genres {
//   id: string;
//   value: string;
//   label: string;
//   _id: string;
// }
export type Genre = {
  value: string;
  label: string;
};
export interface ComicCard {
  name?: string;
  newChap?: string;
  image?: string;
  hot?: string;
  link?: string;
  slug?: string;
  newChapSlug?: string;
}
export interface HotComic {
  data: ComicCard[] | [];
}
export interface Filter {
  dangtienhanh?: string;
  tamngung?: string;
  hoanthanh?: string;
  genres?: string;
  q?: string;
  artist?: string;
  status?: string;
  sort?: string;
  accept_genres?: string;
  reject_genres?: string;
  page?: string;
}
export interface Comic {
  slug: string;
  image: string;
  name: string;
  otherName?: {
    label: string;
    link?: string;
  }[];
  genres?: {
    label: string;
    link: string;
    slug: string;
  }[];
  author?: {
    label: string;
    slug: string;
    link: string;
  }[];
  status?: {
    label: string;
    slug: string;
    link: string;
  }[];
  statisticValue?: {
    name: string;
    value: string;
  }[];
  summary: string;
  chapters: { title: string; link: string; time: string; slug: string }[];
}
export type IPages = {
  id: number;
  src: string;
}[];

export interface INewComics {
  data: ComicCard[] | [];
  meta: {
    totalPage: number | undefined;
  };
}
//theme
export type ChapterResponse = {
  pages: IPages;
  comicSlug: string;
  chapter: string;
};
export interface Page_Image {
  id: string;
  src: string;
  fallbackSrc?: string;
}

export interface Page extends Page_Image {
  _id: string;
}
export interface Chapter {
  pages: { id: number; src: string }[];
  comicSlug: string; //comic slug
  currentChapter: {
    slug: string;
    title: string;
  };
  image: string;
  name: string;
  allChapters: Comic["chapters"];
  summary: string;
  genres: Comic["genres"];
}
export interface ChapterDetails {
  _id: string;
  comicName: string;
  comicSlug: string;
  source: string;
  chapters_list: { _id: string; sourceName: string; chapters: Chapter[] }[];
}

export interface PageInfo {
  _id: string;
  chapterSlug: string;
  comicName: string;
  comicSlug: string;
  pages: Page[];
  source: string;
}
export interface VistedComic {
  slug: string;
  chapterSlug: string[];
  name: string;
  image: string;
  genres: Comic["genres"];
  summary: string;
}

// export type NavigateDirection = "next" | "prev";
// export type Readmode = "ver" | "hor" | "webtoon";
// export interface ReadModeSettings {
//   readMode: Readmode;
// }

export interface Subscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}
