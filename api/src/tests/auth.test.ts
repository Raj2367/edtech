import request from "supertest";
import app from "../app";

describe("Auth API", () => {
  it("registers a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "John Doe",
      email: "john@test.com",
      password: "password123",
      role: "INSTRUCTOR",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("logs in a user and sets HttpOnly cookie", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Jane",
      email: "jane@test.com",
      password: "mypassword",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "jane@test.com", password: "mypassword" });

    expect(res.status).toBe(200);
    expect(res.headers["set-cookie"]).toBeDefined();
  });
});
