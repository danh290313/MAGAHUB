import { NextFunction, Request, Response } from "express";
import webPush from "web-push";
import { config } from "dotenv";
import Subscriber from "../models/Subscriber.model";
import lhModel from "../models/LhModel";
import { isEmptyObject } from "../utils";
import { FE_URL } from "../config";
import { Subscription } from "../types";
config();
const lh = lhModel();
export default function webPushController() {
  return {
    info: async (req: Request, res: Response, next: NextFunction) => {
      const { comicSlug, userId } = req.body;
      //validate body
      if (!comicSlug || !userId) {
        return res.status(400).json({
          success: false,
          message: "missing payload",
        });
      }

      const existingSubscriber = await Subscriber.findOne({
        userId,
        subComics: { $elemMatch: { comicSlug: { $in: comicSlug } } },
        // identifications: { $elemMatch: { endpoint, p256dh, auth } },
      });
      if (!existingSubscriber) {
        return res.status(404).json({
          success: false,
          message: "can not found subscriber or comicSlug!",
        });
      }

      return res.status(200).json({
        success: true,
        message: "subscribed",
      });
    },

    subscribe: async (req: Request, res: Response, next: NextFunction) => {
      const { userId, comicSlug, endpoint, p256dh, auth } = req.body;
      //validate body
      if (!userId || !comicSlug || !endpoint || !p256dh || !auth) {
        return res.status(400).json({
          message: "missing payload",
        });
      }

      //avoid to duplicate identifications
      const existingIdentifications = await Subscriber.findOne({
        userId,
        identifications: { $elemMatch: { endpoint, p256dh, auth } },
      });
      if (comicSlug !== "just_push_new_subscribe") {
        if (!existingIdentifications) {
          //update user to subscribers
          await Subscriber.updateOne(
            { userId },
            {
              userId,
              $addToSet: {
                identifications: {
                  endpoint,
                  p256dh,
                  auth,
                },
                subComics: {
                  comicSlug: comicSlug,
                  lastestChap: (await lh.getComic(comicSlug))?.chapters[0].slug,
                },
              },
            },
            { upsert: true }
          );
        } else {
          await Subscriber.updateOne(
            { userId },
            {
              userId,
              $addToSet: {
                subComics: {
                  comicSlug: comicSlug,
                  lastestChap: (await lh.getComic(comicSlug))?.chapters[0].slug,
                },
              },
            },
            { upsert: true }
          );
        }

        return res.status(200).json({
          success: true,
        });
      }
      //don't need to push comic for new device/browser case:
      if (!existingIdentifications) {
        await Subscriber.updateOne(
          { userId },
          {
            userId,
            $push: {
              identifications: {
                endpoint,
                p256dh,
                auth,
              },
            },
          },
          { upsert: true }
        );
      }

      return res.status(201).json({
        success: true,
      });
    },

    unsubscribe: async (req: Request, res: Response, next: NextFunction) => {
      const { comicSlug, userId } = req.body;

      //validate body
      if (!comicSlug || !userId) {
        return res.status(400).json({
          success: false,
          message: "missing payload",
        });
      }

      const existingSubscriber = await Subscriber.findOne({
        userId,
        // subComics: { $elemMatch: { $in: comicId } },
        subComics: { $elemMatch: { comicSlug: { $in: comicSlug } } },
      });

      if (!existingSubscriber) {
        return res.status(404).json({
          success: false,
          message: "can not found subscriber or comicSlug!",
        });
      }

      const { subComics } = existingSubscriber;
      existingSubscriber.subComics = subComics.filter(
        (comic) => comic.comicSlug !== comicSlug
      );

      if (existingSubscriber.subComics.length !== 0) {
        await existingSubscriber.save();
      } else {
        await existingSubscriber.remove();
      }

      return res.status(200).json({
        success: true,
      });
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
      const subscribers = await Subscriber.find({}).lean();
      const grouped = subscribers.reduce(
        (acc, subscriber) => {
          subscriber.subComics.forEach((subComic) => {
            if (!acc.find((i) => i?.comicSlug === String(subComic.comicSlug))) {
              acc.push({
                comicSlug: subComic.comicSlug,
                lastestChap: subComic.lastestChap,
                subscriptions: [],
              });
            }
          });
          subscriber.subComics.forEach((item) => {
            const res = acc.find(
              //@ts-ignore
              (i) => i?.comicSlug === String(item?.comicSlug)
            );
            //@ts-ignore
            res?.subscriptions.push(...subscriber.identifications);
          });
          return acc;
        },
        [] as {
          comicSlug: string;
          lastestChap: string;
          subscriptions: {
            userId: string;
            endpoint: Subscription["endpoint"];
            p256dh: Subscription["keys"]["p256dh"];
            auth: Subscription["keys"]["auth"];
          }[];
        }[]
      );
      await Promise.allSettled(
        grouped.map(async (item) => {
          try {
            const existingComic = await lh.getComic(item.comicSlug);
            if (
              !isEmptyObject(existingComic) &&
              existingComic?.chapters[0].slug !== item.lastestChap
            ) {
              //////////
              await Promise.allSettled(
                item.subscriptions.map(async (sub) => {
                  try {
                    await Subscriber.updateOne(
                      //idk why it have to await here to work
                      {
                        subComics: {
                          $elemMatch: {
                            comicSlug: item.comicSlug,
                          },
                        },
                        identifications: {
                          $elemMatch: {
                            endpoint: sub?.endpoint,
                            p256dh: sub?.p256dh,
                            auth: sub?.auth,
                          },
                        },
                      },
                      {
                        $set: {
                          "subComics.$.lastestChap":
                            existingComic?.chapters[0].slug,
                        },
                      }
                    );
                    // ///////////
                    await webPush.sendNotification(
                      {
                        endpoint: sub.endpoint,
                        keys: {
                          auth: sub.auth,
                          p256dh: sub.p256dh,
                        },
                      },
                      JSON.stringify({
                        title: `${existingComic?.name} đã có chap mới`,
                        body: existingComic?.chapters[0].title,
                        // badge:
                        //   "https://res.cloudinary.com/lee1002/image/upload/v1658088029/personal/xykwxyxuhnmpg3nxgvrv.png",
                        // icon: "https://res.cloudinary.com/lee1002/image/upload/v1658088029/personal/xykwxyxuhnmpg3nxgvrv.png",
                        image: existingComic?.image,
                        data: {
                          url: `${FE_URL}/comic/details/${item.comicSlug}`,
                        },
                      })
                    );
                  } catch (error: any) {
                    console.log(error);
                    if (
                      error?.body?.includes("expire") ||
                      error?.body?.includes("unsubscribe")
                    ) {
                      await Subscriber.updateOne(
                        {
                          identifications: {
                            $elemMatch: {
                              endpoint: sub?.endpoint,
                              p256dh: sub?.p256dh,
                              auth: sub?.auth,
                            },
                          },
                        },
                        {
                          $pull: {
                            identifications: {
                              $elemMatch: {
                                endpoint: sub?.endpoint,
                                p256dh: sub?.p256dh,
                                auth: sub?.auth,
                              },
                            },
                          },
                        }
                      );
                    }
                  }
                })
              );
            }
          } catch (err) {
            // console.log(":: ", err);
            next();
          }
        })
      );

      return res.status(200).json({
        message: "Ok",
      });
    },
  };
}
