import { type NextRequest } from "next/server";

import dbConnect from "@/lib/mongodb";
import Report from "@/models/report";

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  await dbConnect();

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");
  const perPage = searchParams.get("perPage");

  const perPageNum = Number(perPage) || 3;

  try {
    const mostReportedUsers = await Report.aggregate([
      // Lookup reported users to join username data
      {
        $lookup: {
          from: "reportedusers",
          localField: "reportedAccount",
          foreignField: "_id",
          as: "reportedUser",
        },
      },
      { $unwind: "$reportedUser" }, // Flatten the joined array
      // Text search on the reported user's username
      ...(search
        ? [
            {
              $match: {
                "reportedUser.username": { $regex: search, $options: "i" }, // Case-insensitive search
              },
            },
          ]
        : []),
      // Group by reported user and count reports
      {
        $group: {
          _id: "$reportedAccount",
          username: { $first: "$reportedUser.username" }, // Keep username
          reportCount: { $sum: 1 },
        },
      },
      { $sort: { reportCount: -1 } }, // Sort by most reported
      { $limit: perPageNum }, // Limit results
    ]);

    return Response.json({ mostReportedUsers, error: null });
  } catch (error) {
    console.log(error);
    return Response.json({ populatedUsers: null, error });
  }
}
