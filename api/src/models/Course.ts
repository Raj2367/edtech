import mongoose, { Schema, Document } from "mongoose";
import { generateSlug } from "../utils/slugify";

/**
 * Course document interface.
 * Slug ensures SEO-friendly URLs and stable course linking.
 */
export interface ICourse extends Document {
  title: string;
  slug: string;
  description?: string;
  published: boolean;
  instructorId: mongoose.Types.ObjectId;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    slug: { type: String },
    description: { type: String },
    published: { type: Boolean, default: false },
    instructorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

/**
 * Auto-generate slug when title changes.
 */
CourseSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }
});

// Useful for search, pagination, and filtering
CourseSchema.index({ slug: 1 }, { unique: true });
CourseSchema.index({ instructorId: 1 });

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
