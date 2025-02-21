import { type NextRequest } from "next/server";

import dbConnect from "@/lib/mongodb";
import ReportedUser from "@/models/reportedUser";

export async function GET(request: NextRequest) {
  await dbConnect();

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");

  const userReported = await ReportedUser.find({
    $text: { $search: decodeURIComponent(search as string) },
  });
  return Response.json({ userReported });
}
