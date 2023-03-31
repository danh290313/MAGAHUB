import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useReadLocalStorage } from "usehooks-ts";
import useSubscription from "~/context/SubscriptionContext";
import { axiosClient } from "~/services/axiosClient";
import { register } from "~/services/registerServiceWorkers";

export default function useNotification() {
  const router = useRouter();
  const sub = useSubscription();
  const { data: session, status } = useSession();
  const isSupportedSW = useReadLocalStorage("supportSW");

  return {
    info: async (comicSlug: string) => {
      try {
        const res = await (
          await axiosClient.post("notify/info", {
            comicSlug,
            //@ts-ignore
            userId: session?.user?.id as string,
          })
        ).data;

        if (res?.message === "subscribed") return "subscribed";
        else return "nonsub";
      } catch (err) {
        return "nonsub";
      }
    },

    subscribe: async (comicSlug: string) => {
      if (!isSupportedSW) return "unsupported_browser";

      if (status === "unauthenticated") {
        router.push("/login");
        return;
      }

      if (Notification.permission !== "granted") {
        const result = await Notification.requestPermission();
        if (result !== "granted") return "permission_denied";
        else {
          const subscription = await register();
          if (!subscription) return "error";

          const parsed = JSON.parse(JSON.stringify(subscription));
          const { expirationTime, ...rest } = parsed;

          sub?.setSubscription(rest);
          try {
            await axiosClient.post("/notify/subscribe", {
              //@ts-ignore
              userId: session?.user?.id as string,
              endpoint: rest?.subscription?.endpoint,
              p256dh: rest?.subscription?.keys.p256dh,
              auth: rest?.subscription?.keys.auth,
              comicSlug,
            });

            return "success";
          } catch (err) {
            console.error("error subscribe:: ", err);
            return "error";
          }
        }
      }

      try {
        await axiosClient.post("/notify/subscribe", {
          //@ts-ignore
          userId: session?.user?.id as string,
          endpoint: sub?.subscription?.endpoint,
          p256dh: sub?.subscription?.keys.p256dh,
          auth: sub?.subscription?.keys.auth,
          comicSlug,
        });

        return "success";
      } catch (err) {
        console.error("error subscribe:: ", err);
        return "error";
      }
    },

    unsubscribe: async (comicSlug: string) => {
      if (status === "unauthenticated") {
        router.push("/login");
        return;
      }
      try {
        await axiosClient.delete(`notify/unsubscribe`, {
          data: {
            comicSlug,
            //@ts-ignore
            userId: session?.user?.id as string,
          },
        });

        return "success";
      } catch (err) {
        console.error("error unsubscribe:: ", err);
        return "error";
      }
    },
  };
}
