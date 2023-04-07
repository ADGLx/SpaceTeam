const editAccount = require("../Server/editAccount");
const db = require("../Server/database");

jest.mock("../Server/database");
describe("User Account edit function", () => {
  test("Should return 200 status upon successfully editting a user account", async () => {
    const req = {
      body: {
        ID: "8",
        username: "Google G2",
        email: "google@gmail.com",
      },
      files: {
        cv: null,
        pf: null,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    db.query.mockImplementationOnce((query, params, callback) => {
      callback(
        null,
        [{ ID: 8, username: "Google G2", email: "google@gmail.com" }],
        {}
      );
    });

    await editAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Should return 403 status upon attempting to edit a empty username or email", async () => {
    const req = {
      body: {
        ID: "8",
        username: "",
        email: "google@gmail.com",
      },
      files: {
        cv: null,
        pf: null,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, [], {});
    });

    await editAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith(false);
  });

  test("Should return 500 status upon attempting to query with incorrect info", async () => {
    const req = {
      body: {
        ID: "", //Invalid Query
        username: "Google G2",
        email: "google@gmail.com",
      },
      files: {
        cv: null,
        pf: null,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, []);
    });

    await editAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(false);
  });
});
