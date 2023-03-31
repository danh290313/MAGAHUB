import axios from "axios";
import { useSession } from "next-auth/react";
import { axiosClient } from "~/services/axiosClient";
import { Comic } from "~/types";

export default function useFollow() {
  const { data: session, status } = useSession();
  //@ts-ignore
  const userId = session?.user?.id as string;
  const add = async (mangaSlug: string) => {
    try {
      if (!userId) return false;
      await axios.post(`/api/follow/${mangaSlug}`, {
        userId,
      });

      return true;
    } catch (err) {
      // console.error(err);
      return false;
    }
  };

  const get = async (mangaSlug: string) => {
    try {
      if (!userId) return "notfollowed";

      const response = await axios.get(
        `/api/follow/${mangaSlug}?userId=${userId}`
      );
      if (response.data) return "followed";
    } catch (err) {
      console.error(err);
      return "notfollowed";
    }
  };
  const getAllFollows = async (page: string = "1") => {
    try {
      if (!userId) return null;
      const { data } = await axiosClient.get("user/follows", {
        params: {
          userId,
          page,
        },
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  const _delete = async (mangaSlug: string) => {
    try {
      if (!userId) return false;
      await axios.delete(`/api/follow/${mangaSlug}?userId=${userId}`);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  const setReaded = async (mangaSlug: string, chapterSlug?: string) => {
    try {
      if (!userId) return false;
      await axios.put(`/api/follow/${mangaSlug}`, {
        userId,
        chapterSlug,
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  return { add, get, _delete, getAllFollows, setReaded };
}
