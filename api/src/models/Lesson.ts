import mongoose, { Document, Schema } from "mongoose";

/**
 * Lesson interface. Belongs to a Course.
 * Position field supports drag-n-drop reordering on frontend.
 */
export interface ILesson extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  position: number;
}

const LessonSchema = new Schema<ILesson>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    position: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexes to optimize course-page queries
LessonSchema.index({ courseId: 1, position: 1 });

export const Lesson = mongoose.model<ILesson>("Lesson", LessonSchema);
