const deletePost = require("../Server/deletePost");
const db = require("../Server/database");

jest.mock("../Server/database");

describe("Deleting post function", () => {
  test("Should return 200 status for successful deletion", async () => {
    const req = {
      body: {
        PostID: "73",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, { jobID: req.body.PostID });
    });

    await deletePost(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Should return 403 status for unsuccessful deletion", async () => {
    const req = {
      body: {
        PostID: "0",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, []);
    });

    await deletePost(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});
