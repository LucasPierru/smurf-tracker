import { type NextRequest } from "next/server";

import dbConnect from "@/lib/mongodb";
import ReportedUser from "@/models/reportedUser";

export const maxDuration = 300;

export async function GET(request: NextRequest) {
  await dbConnect();

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const perPage = searchParams.get("perPage");

  const perPageNum = Number(perPage) || 3;
  const pageNum = Number(page) || 0;

  const query: { $text?: { $search: string } } = {};

  if (search) {
    query.$text = { $search: search as string };
  }

  try {
    const reportedUsers = await ReportedUser.find(query)
      .limit(perPageNum)
      .skip(pageNum * perPageNum);
    return Response.json({ reportedUsers, error: null });
  } catch (error) {
    console.log(error);
    return Response.json({ reportedUsers: null, error });
  }
}
