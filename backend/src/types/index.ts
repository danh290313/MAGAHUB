import { BlobOptions } from "buffer";

// export interface IComic {
//   status: string;
//   author: string;
//   genres: Genres[];
//   otherName: string;
//   review: string;
//   newChapter: string;
//   thumbnail: string;
//   name: string;
//   slug: string;
//   sourcesAvailable: [
//     {
//       sourceName: string;
//       sourceSlug: string;
//       _id: string;
//     }
//   ];
//   __v: number;
//   chapters: string;
//   votes?: string[];
// }
export interface QuerryManga {
  page?: string;
  limit?: string;
}
export interface Genres {
  id: string;
  value: string;
  label: string;
  _id: string;
}
export interface IComicFilter extends QuerryManga {
  genres?: string;
  status?: string;
  sort?: string;
}

export interface ComicCard {
  name?: string;
  newChap?: string;
  image?: string;
  hot?: string;
  link?: string;
  slug?: string;
  newChapSlug?: string;
}
export interface Filter {
  sort?: "az" | "za" | "update" | "new" | "like";
  dangtienhanh?: string;
  tamngung?: string;
  hoanthanh?: string;
  genre?: string;
  page?: string;
}
export interface Comic {
  slug?: string;
  image?: string;
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
export interface extendedComic extends Comic {
  readed?: string[];
  lastTimeReaded?: number;
}
export interface Page_Image {
  id: string;
  src: string;
  fallbackSrc?: string;
}

export interface Page extends Page_Image {
  _id: string;
}
// export interface Chapter {
//   chapterId: string;
//   chapterNumber: string;
//   chapterTitle: string;
//   chapterSlug?: string;
//   updatedAt: string;
//   view: string;
//   _id?: string;
// }
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
// export interface ChapterDetails {
//   _id: string;
//   comicName: string;
//   comicSlug: string;
//   source: string;
//   chapters_list: { _id: string; sourceName: string; chapters: Chapter[] }[];
// }

export type IPages = {
  id: number;
  src: string;
}[];
export interface PageInfo {
  _id: string;
  chapterSlug: string;
  comicName: string;
  comicSlug: string;
  pages: Page[];
  source: string;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// interface Owner {
//   _id: string;
//   name: string;
//   image: string;
// }

// export interface Reactions {
//   clown_face: string[];
//   thumbs_up: string[];
//   heart: string[];
//   enraged_face: string[];
// }

// export interface Comment {
//   reactions: Reactions;
//   _id: string;
//   comicSlug: string;
//   comicName: string;
//   section: string;
//   contents: string;
//   owner: Owner;
//   isSpoil?: boolean;
//   replies: Comment[];
//   totalReactions: number;
//   createdAt: Date;
//   updatedAt: Date;
//   lastEdited?: Date;
//   replyTo?: string;
// }

// export interface Notification {
//   _id: string;
//   owner: Pick<Owner, "image" | "name">;
//   comment: Pick<Comment, "_id" | "comicSlug" | "comicName" | "section"> | null;
//   response: Pick<Owner, "image" | "name">;
//   createdAt: Date;
//   updatedAt: Date;
//   seen?: Date;
// }

// export type sources =
//   | "nettruyen"
//   | "lhmanga"
//   | "truyenqq"
//   | "mangadex"
//   | "mangareader";

export interface Subscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}
export interface ISubscriber {
  userId: string;
  subComics: {
    comicSlug: string;
    lastestChap: string;
  }[];
  identifications: {
    endpoint: string;
    p256dh: string;
    auth: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
export interface WatchList {
  userId: string;
  comics: { slug: string; readed?: string }[];
}
// export interface SelectType {
//   value: string;
//   label: string;
// }

// export interface ImgRatio {
//   index: number;
//   ratio: number;
// }

// export type ImageMode = "full" | "fitW" | "fitH";

// export type ReadMode = "vertical" | "horizontal";

// export type ReadDirection = "rtl" | "ltr";

// export type NavigateDirection = "next" | "prev";

// export type NextDirection = "right" | "left";

// export interface ComicFollowed {
//   _id: string;
//   mangaSlug: string;
//   userId: string;
//   createAt: Date;
//   source: string;
//   status: string;
// }

// export type FollowState =
//   | "reading"
//   | "on-hold"
//   | "dropped"
//   | "plan-to-read"
//   | "completed"
//   | "re-reading";

// export interface ReadModeSettings {
//   readMode: ReadMode;
//   readDirection: ReadDirection;
//   nextDirection: NextDirection;
//   autoNext?: boolean;
// }

// export type SourcesId = "NTC" | "LHM" | "OTK";

// export interface MangaResource {
//   sourceName: string;
//   sourceId: SourcesId;
// }

// export type Status = "Đang tiến hành" | "Hoàn thành";

// export interface ServerResponse {
//   success: boolean;
//   totalPages: number;
//   hasPrevPage: boolean;
//   hasNextPage: boolean;
// }

// export interface NtSearchResponseData {
//   thumbnail: string;
//   name: string;
//   slug: string;
//   newChapter: string;
//   genres: string[];
// }

// export interface Manga extends NtSearchResponseData {
//   status: Status;
//   author: string;
//   otherName: string;
//   review: string;
//   updatedAt: string;
//   chapters?: Chapter[];
// }
// // -> obsolescent
// export interface MangaDetails {
//   title: string;
//   updatedAt: string;
//   otherName: string;
//   author: string;
//   thumbnail: string;
//   status: string;
//   genres: Genre[];
//   view: string;
//   review: string;
//   chapterList: Chapter[];
// }

// export type HeadlessManga = Pick<MangaDetails, "chapterList" | "title"> & {
//   mangaSlug: string;
//   isWebtoon?: boolean;
// };

// export interface Chapter {
//   chapterId: string;
//   chapterNumber: string;
//   chapterTitle: string;
//   chapterSlug?: string;
//   updatedAt: string;
//   view: string;
//   _id?: string;
// }

// export interface Genre {
//   genreTitle: string;
//   slug: string;
// }

// export interface LHSearchRes {
//   success: boolean;
//   data: DataLHSearchRes;
// }

// export interface DataLHSearchRes {
//   status: number;
//   success: boolean;
//   data: LHMangaSearch[];
// }

// export interface LHMangaSearch {
//   id: number;
//   name: string;
//   cover_url: string;
//   pilot: string;
//   url: string;
// }

// export interface ImagesChapter {
//   id: string;
//   imgSrc: string;
//   imgSrcCDN?: string;
// }

// export interface Page_Image {
//   id: string;
//   src: string;
//   fallbackSrc?: string;
// }

// export interface Page extends Page_Image {
//   _id: string;
// }

// export interface ChapterDetails {
//   _id: string;
//   comicName: string;
//   comicSlug: string;
//   source: string;
//   chapters_list: { _id: string; sourceName: string; chapters: Chapter[] }[];
// }

// export interface PageInfo {
//   _id: string;
//   chapterSlug: string;
//   comicName: string;
//   comicSlug: string;
//   pages: Page[];
//   source: string;
// }

// export interface Comic {
//   _id: string;
//   name: string;
//   __v: number;
//   author: string;
//   custom_id: number;
//   genres: Genre[];
//   chapters?: ChapterDetails; // -> fallback comic hasn't chapters
//   description?: Description; // -> fallback comic hasn't description
//   newChapter: string;
//   otherName: string;
//   review: string;
//   slug: string;
//   sourcesAvailable: SourcesAvailable[];
//   status: string;
//   thumbnail: string;
//   updatedAt: string;
//   votes?: string[];
// }

// export interface Genre {
//   id: string;
//   value: string;
//   label: string;
//   _id: string;
// }

// export interface Character {
//   _id: string;
//   cover: string;
//   mal_url: string;
//   name: string;
//   role: string;
// }

// export interface DescPicture {
//   large: string;
//   small: string;
//   _id: string;
// }

// export interface Description {
//   _id: string;
//   name: string;
//   characters: Character[];
//   titles: {
//     title_synonyms: string;
//     title_japanese: string;
//     title_english: string;
//   };
//   cover: string;
//   description: string;
//   mal_id: string;
//   popularity: string;
//   published: string;
//   ranked: string;
//   score: string;
//   slug: string;
//   pictures: DescPicture[];
// }

// export interface SourcesAvailable {
//   sourceName: string;
//   sourceSlug: string;
//   _id: string;
// }

// export type ViewSelection =
//   | "Chapters"
//   | "Characters"
//   | "Details"
//   | "Pictures"
//   | "Recommendations";
