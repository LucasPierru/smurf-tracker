import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

// Define TypeScript interface for a Report
export interface IReportedUser extends Document {
  createdAt: Date;
  updatedAt: Date;
  username: string;
  reports: mongoose.Types.ObjectId[];
}

const ReportedUserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
  },
  { timestamps: true }
);

ReportedUserSchema.index({ username: "text" });

const ReportedUser =
  mongoose.models.ReportedUser ||
  model<IReportedUser>("ReportedUser", ReportedUserSchema);
export default ReportedUser;
