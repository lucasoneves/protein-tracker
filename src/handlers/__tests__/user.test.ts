import app from "../../server";
import supertest from "supertest";

describe("Sign up user", () => {
  test("should respond with a 201 status code", async () => {
    await supertest(app).post('/signup').send({
      username: 'glenda gibson',
      email: 'glenda.gibson@example.com',
      password: '123456'
    }).expect(201);
  })
});
