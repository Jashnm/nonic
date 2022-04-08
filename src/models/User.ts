import mongoose from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  pin?: string;
  createdAt: string;
  updatedAt: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: String,
    email: { type: String, required: true },
    pin: { type: String, required: true }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
