// Uncomment the following to see STDERR of the server
//process.env.NODE_ENV = "dev";

import request from "supertest";
import app from "../src/app";

describe("Greeter", () => {
  it("should say hello", async () => {
    const name = "Linus";
    const res = await request(app).get("/").query({ name });
    const expected = { data: "Hello, Linus!" };
    expect(res.status).toEqual(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.data).toEqual(expected.data);
  });

  it("should return 400 for an array in the name query parameter", async () => {
    const name = ["invalid", "array"];
    const res = await request(app).get("/").query({ name });
    expect(res.status).toEqual(400);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.error).toBe('ValidationError: "name" must be a string');
  });
});
