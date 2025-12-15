import request from "supertest";
import app from "../app";

describe("Lesson API", () => {
  let cookie: string;
  let courseId: string;

  beforeEach(async () => {
    await request(app).post("/api/auth/register").send({
      name: "Inst",
      email: "inst@test.com",
      password: "pass123",
      role: "INSTRUCTOR",
    });

    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "inst@test.com", password: "pass123" });

    cookie = login.headers["set-cookie"];

    const course = await request(app)
      .post("/api/courses")
      .set("Cookie", cookie)
      .send({ title: "Course 1" });

    courseId = course.body.data._id;
  });

  it("creates a lesson", async () => {
    const res = await request(app)
      .post(`/api/lessons/${courseId}`)
      .set("Cookie", cookie)
      .send({
        title: "Lesson 1",
        content: "Introduction to course",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("Lesson 1");
  });

  it("lists lessons", async () => {
    await request(app)
      .post(`/api/lessons/${courseId}`)
      .set("Cookie", cookie)
      .send({ title: "L1999", content: "..................." });

    const res = await request(app).get(`/api/lessons/${courseId}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });
});
