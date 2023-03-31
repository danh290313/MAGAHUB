import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "~/serverless/utils/connectdb";
import { Db } from "mongodb";
const follows = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { userid } = req.headers;
  const { db }: { db: Db } = await connectToDatabase();

  switch (method) {
    case "GET":
      const data = await db
        .collection("watchlists")
        .findOne({ userId: userid });

      if (!data) return res.status(404).json({ message: "items not found" });

      res.status(200).json(data);
      break;
  }
};

export default follows;
