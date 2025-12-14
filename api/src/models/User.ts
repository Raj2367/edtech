import mongoose, { Schema, Document, } from "mongoose";
import bcrypt from "bcryptjs";

/**
 * TypeScript interface describing a User document.
 * Promotes maintainability and autocompletion across services.
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["ADMIN", "INSTRUCTOR", "STUDENT"],
      default: "STUDENT",
    },
  },
  { timestamps: true }
);

/**
 * Password hashing middleware.
 * Ensures passwords are never stored in plain text.
 */
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compare hashed password with plain text.
 * Secure login helper.
 */
UserSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

// Performance: index on email for faster queries
UserSchema.index({ email: 1 });

export const User = mongoose.model<IUser>("User", UserSchema);
