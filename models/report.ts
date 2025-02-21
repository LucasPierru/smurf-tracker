import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

// Define TypeScript interface for a Report
export interface IReport extends Document {
  createdAt: Date;
  updatedAt: Date;
  reportedAccount: mongoose.Types.ObjectId;
  message: string;
}

const ReportSchema = new Schema(
  {
    reportedAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserRepored",
      required: true,
    },
    message: String,
  },
  { timestamps: true }
);

const Report = mongoose.models.Report || model<IReport>("Report", ReportSchema);
export default Report;
