import request from "supertest";
import app from "../app";

describe("Course API", () => {
  let instructorCookie: string;

  beforeEach(async () => {
    // register instructor
    await request(app).post("/api/auth/register").send({
      name: "Instructor",
      email: "inst@test.com",
      password: "pass123",
      role: "INSTRUCTOR",
    });

    // login
    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "inst@test.com", password: "pass123" });

    instructorCookie = login.headers["set-cookie"];
  });

  it("creates a new course", async () => {
    const res = await request(app)
      .post("/api/courses")
      .set("Cookie", instructorCookie)
      .send({
        title: "Next.js Fundamentals",
        description: "Learn SSR, client/server components",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("Next.js Fundamentals");
  });

  it("lists instructor courses", async () => {
    await request(app)
      .post("/api/courses")
      .set("Cookie", instructorCookie)
      .send({ title: "Course A" });

    const res = await request(app)
      .get("/api/courses/instructor")
      .set("Cookie", instructorCookie);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });
});
