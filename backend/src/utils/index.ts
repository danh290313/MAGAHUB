import axios from "axios";
export const axiosClient = axios.create();

export const isNumber = (str: string | string[] | number) => {
  if (typeof str === "number") return true;
  if (str.length === 0) return false;
  if (typeof str === "string") return !isNaN(Number(str));
  const NaN = str.find((s) => isNaN(Number(s)));
  if (NaN) return false;
  return true;
};
export const getImageUrl = (url?: string) =>
  url ? url.split("url('")[1].split("')")[0] : undefined;

export function isEmptyObject(obj: any) {
  if (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  ) {
    return true;
  }

  return false;
}
