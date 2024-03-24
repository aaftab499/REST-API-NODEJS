import {Schema, Document, model} from "mongoose";
import bcrypt from "bcrypt";
import config, { has } from "config";

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

// ts definition for user
export interface UserDocument extends UserInput, Document {
	createdAt: Date;
	updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new Schema<UserDocument>(
	{
		email: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

// presave hook, invoked before userSchema
userSchema.pre("save", async function (next) {
	let user = this as unknown as UserDocument;

	if (!user.isModified("password")) {
		return next();
	}
	const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

	const hash = await bcrypt.hashSync(user.password, salt);

	user.password = hash;
	return next();
});

userSchema.methods.comparePassword = async function(
  candidatePassword: string
): Promise<boolean> {
	let user = this as UserDocument;

	return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};
const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
