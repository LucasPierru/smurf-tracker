import dbConnect from "@/lib/mongodb";
import Report from "@/models/report";
import ReportedUser from "@/models/reportedUser";

export const maxDuration = 300;

export async function POST(request: Request) {
  await dbConnect();

  const res = await request.json();

  const { username, message } = res;

  const userReported = await ReportedUser.findOneAndUpdate(
    { username },
    { username },
    { new: true, upsert: true }
  );
  const report = await Report.insertOne({
    reportedAccount: userReported._id,
    message,
  });
  return Response.json({ report });
}
