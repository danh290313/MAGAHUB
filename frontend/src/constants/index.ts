// import { DropDownLink } from '~/components/shared/DropDown';
// import { MangaResource, SourcesId, FollowState } from '~/types';

export const REVALIDATE_TIME = 3 * 60 * 60; //3h
export const REVALIDATE_TIME_DETAILS_PAGE = 5 * 60; //5m

//ref: src/pages
export const MANGA_PATH_NAME = "comic";
//ref: src/pages
export const MANGA_BROWSE_PAGE = "browse";
//ref: src/pages/comic
export const MANGA_PATH_DETAILS_NAME = "details";
//ref: src/pages/comic
export const MANGA_PATH_READ_NAME = "read";
//ref: src/pages
export const PRIVATE_PATH = "follows";
export const WEBSITE_URL = process.env.BASE_URL;

export const sort_options = [
  { label: "A-Z", value: "az" },
  { label: "Z-A", value: "za" },
  { label: "Mới cập nhật", value: "update" },
  { label: "Truyện mới", value: "new" },
  { label: "Xem nhiều", value: "top" },
  { label: "Được thích nhiều", value: "like" },
];

export const status_options = [
  { label: "Đang tiến hành", value: "dangtienhanh", replaceVal: "1" },
  { label: "Tạm ngưng", value: "tamngung", replaceVal: "2" },
  { label: "Đã hoàn thành", value: "hoanthanh", replaceVal: "3" },
];
export const FOLLOW_STATE = [
  {
    id: "reading",
    title: "Đang đọc",
  },
  {
    id: "completed",
    title: "Hoàn thành",
  },
  {
    id: "dropped",
    title: "Tạm ngưng",
  },
  {
    id: "on-hold",
    title: "Giữ lại",
  },
  {
    id: "plan-to-read",
    title: "Dự định đọc",
  },
  {
    id: "re-reading",
    title: "Đọc lại",
  },
];
