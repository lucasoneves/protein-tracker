import app from "../../server";
import supertest from "supertest";

describe("Sign up user", () => {
  const payload = {
    body: {
      username: '',
      email: 'lucasneves@gmail',
      password: '123456'
    }
  }
  const res = { message: "User created successfully" };
  test("should respond with a 201 status code", async () => {
    const response = await supertest(app).post('/signup').send({
      username: 'glenda gibson',
      email: 'glenda.gibson@example.com',
      password: '123456'
    }).expect(201);
  })
});
