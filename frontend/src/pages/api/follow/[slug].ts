import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "~/serverless/utils/connectdb";
import { Comic } from "~/types";
import { Db, WithId, Document } from "mongodb";
const follow = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;
  let { slug: mangaSlug, userId } = query;
  if (!userId) userId = body.userId;
  // const {slug } = req.
  const { db }: { db: Db } = await connectToDatabase();
  switch (method) {
    case "POST":
      try {
        const existingFollow = await db.collection("watchlists").findOne({
          userId: body.userId,
          "comics.slug": mangaSlug,
          // "manga.slug": (body.manga as Comic).slug,
        });
        if (!existingFollow)
          await db.collection("watchlists").updateOne(
            {
              userId: body.userId,
              // "manga.slug": (body.manga as Comic).slug,
            },
            {
              $addToSet: {
                comics: {
                  slug: mangaSlug,
                  lastTimeReaded: new Date().getTime(),
                },
              },
            },
            { upsert: true }
          );

        res.status(201).json({
          success: true,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
      break;

    case "GET":
      try {
        const data = await db
          .collection("watchlists")
          .findOne({ userId, "comics.slug": mangaSlug });

        if (!data) return res.status(404).json({ message: "items not found" });

        return res.status(200).json({
          success: true,
          data,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
      break;

    case "DELETE":
      try {
        const collection = (await db
          .collection("watchlists")
          .findOne({ userId, "comics.slug": mangaSlug })) as WithId<Document>;
        // collection.
        if (collection.comics.length === 1) {
          db.collection("watchlists").deleteOne({
            userId: collection.userId,
          });
        } else {
          db.collection("watchlists").updateOne(
            {
              userId: collection.userId,
            },
            {
              $pull: {
                comics: { slug: mangaSlug },
              },
            }
          );
        }
        res.status(200).json({
          success: true,
        });
      } catch (err) {
        res.status(500).json(err);
      }
      break;
    case "PUT":
      try {
        if (body.chapterSlug) {
          const resp = await db.collection("watchlists").updateOne(
            {
              userId,
              "comics.slug": mangaSlug,
            },
            {
              $addToSet: {
                "comics.$.readed": body.chapterSlug,
              },
              $set: {
                "comics.$.lastTimeReaded": new Date().getTime(),
              },
            }
          );
          res.status(200).json({
            success: true,
            resp,
          });
        } else {
          const resp = await db.collection("watchlists").updateOne(
            {
              userId,
              "comics.slug": mangaSlug,
            },
            {
              $set: {
                "comics.$.lastTimeReaded": new Date().getTime(),
              },
            }
          );
          res.status(200).json({
            success: true,
            resp,
          });
        }

        // }
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
      break;

    default:
      res.status(500).json({
        message: "Method not matches",
      });
  }
};

export default follow;
