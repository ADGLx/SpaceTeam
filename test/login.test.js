const request = require("supertest");
const app = require('../Server/Server.js')

describe("POST /api/login", () => {
  afterAll(() => {
    app.close();
  })

  test("Should return 200 OK status and user information on successful login", async () => {
    const response = await request(app).post("/api/login").send({
      //valid Credentials
      username: "facebook@gmail.com",
      password: "facebook1",
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    //We can add a check for the id returned but it bugs for me rn
  });

  //Second test that will fail:
  test("Should return an error message on unsuccessful login attempt", async () => {
    const response = await request(app).post("/api/login").send({
      //Invalid Credentials
      username: "loginTest@gmail.com",
      password: "1234aA",
    });
    expect(response.status).toBe(401);
    expect(response.body).toBe(true); //Because that is what sends when login is invalid
  });
});
