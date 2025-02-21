import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

// Define TypeScript interface for a Report
export interface IUser extends Document {
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  reports: mongoose.Types.ObjectId[];
}

const ReportSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
  },
  { timestamps: true }
);

const Report = mongoose.models.User || model<IUser>("User", ReportSchema);
export default Report;
