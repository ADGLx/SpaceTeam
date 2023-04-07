const login = require("../Server/login");
const db = require("../Server/database");

jest.mock("../Server/database");

describe("Login function", () => {
  test("should return 200 status and user info on successful login", async () => {
    // Mocking the request and response objects
    const req = {
      body: {
        username: "facebook@gmail.com",
        password: "facebook1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mocking the database query response
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(
        null,
        [{ ID: 81, email: "facebook@gmail.com", password: "facebook1" }],
        {}
      );
    });

    // Calling the login function with mocked request and response objects
    await login(req, res);

    // Asserting that the response status and send functions were called with the expected parameters
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      JSON.stringify({
        ID: 81,
        email: "facebook@gmail.com",
        password: "facebook1",
      })
    );
  });

  test("should return 401 status on invalid login", async () => {
    // Mocking the request and response objects
    const req = {
      body: {
        username: "example@example.com",
        password: "invalidpassword",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mocking the database query response
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, [], {});
    });

    // Calling the login function with mocked request and response objects
    await login(req, res);

    // Asserting that the response status and send functions were called with the expected parameters
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(true);
  });
});
