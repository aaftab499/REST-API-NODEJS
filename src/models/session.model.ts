import { Schema, Document, model } from "mongoose";
import { UserDocument } from "./user.model";

// ts definition for user
export interface SessionDocument extends Document {
	user: UserDocument["_id"];
	valid: boolean;
	userAgent: string;
	createdAt: Date;
	updatedAt: Date;
}

const sessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
	{
		timestamps: true,
	}
);

const SessionModel = model<SessionDocument>("Session", sessionSchema);

export default SessionModel;
