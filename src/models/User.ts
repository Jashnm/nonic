import mongoose from "mongoose";

export interface IUser {
  _id: string;
  name: string;

  pin?: string;
  createdAt: string;
  updatedAt: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: String,
    pin: { type: String, required: true }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
