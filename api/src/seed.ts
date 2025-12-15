import "dotenv/config";
import mongoose from "mongoose";
import { User } from "./models/User.js";
import { Course } from "./models/Course.js";
import { Lesson } from "./models/Lesson.js";
import { connectDB } from "./config/db.js";

/**
 * Utility: sleep function for nicer console flow.
 */
function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

async function seed() {
  console.log("🔄 Connecting to DB...");
  await connectDB();

  console.log("🧨 Clearing existing data...");
  await User.deleteMany({});
  await Course.deleteMany({});
  await Lesson.deleteMany({});

  console.log("👤 Creating users...");

  const admin = await User.create({
    name: "Admin User",
    email: "admin@example.com",
    password: "AdminPass123!",
    role: "ADMIN",
  });

  const instructor = await User.create({
    name: "John Instructor",
    email: "instructor@example.com",
    password: "InstructorPass123!",
    role: "INSTRUCTOR",
  });

  const student = await User.create({
    name: "Sarah Student",
    email: "student@example.com",
    password: "StudentPass123!",
    role: "STUDENT",
  });

  console.log("👨‍🏫 Creating courses for instructor...");

  const courseTitles = [
    "Introduction to Web Development",
    "Advanced JavaScript Concepts",
    "Full-Stack Engineering Fundamentals",
  ];

  const courses = await Promise.all(
    courseTitles.map((title) =>
      Course.create({
        title,
        description: `This is a dummy description for ${title}.`,
        instructorId: instructor._id,
        published: true,
      })
    )
  );

  console.log("📘 Creating lessons for each course...");

  const lessonTemplates = [
    {
      title: "Lesson 1: Overview",
      content:
        "This is the introduction lesson content. Replace with real data.",
    },
    {
      title: "Lesson 2: Deep Dive",
      content: "This lesson covers deeper insights into the topic.",
    },
    {
      title: "Lesson 3: Practical Exercise",
      content: "This lesson provides hands-on tasks.",
    },
  ];

  for (const course of courses) {
    for (let i = 0; i < lessonTemplates.length; i++) {
      await Lesson.create({
        courseId: course._id,
        title: `${lessonTemplates[i].title} for ${course.title}`,
        content: lessonTemplates[i].content,
        position: i,
      });
    }
  }

  console.log("✅ Seeding complete!");
  console.log("📌 Admin login → admin@example.com / AdminPass123!");
  console.log(
    "📌 Instructor login → instructor@example.com / InstructorPass123!"
  );
  console.log("📌 Student login → student@example.com / StudentPass123!");

  await sleep(500);

  mongoose.connection.close();
  console.log("🔌 DB connection closed.");
}

seed().catch((err) => {
  console.error("❌ Seeding error:", err);
  mongoose.connection.close();
});
