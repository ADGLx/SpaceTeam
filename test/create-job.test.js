const createJob = require("../Server/create-job.js");
const db = require("../Server/database");
const validateJob = require("../Server/validateJob");

jest.mock("../Server/database");

//First tests will check the validateJob method:
test("Should return false because the position field is empty", () => {
  expect(validateJob("", "info details test")).toBe(false);
});

test("Should return false because the position info field is empty", () => {
  expect(validateJob("Position title test", "")).toBe(false);
});

test("Should return true because both fields are set", () => {
  expect(validateJob("Position title test", "info details")).toBe(true);
});

//Now we test for valid and invalid db query:
describe("Create job function", () => {
  test("Should return a 200 status if query is valid", async () => {
    const req = {
      body: {
        //Valid Input:
        EmployerID: "8",
        CompanyName: "Google",
        Position: "Engineer",
        PositionInfo: "Info about the job",
        Report: "0",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mocking db query response
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null);
    });

    await createJob(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Should return a 500 status because of missing input causing a server error", async () => {
    const req = {
      body: {
        EmployerID: "", //Invalid Input
        CompanyName: "Google",
        Position: "Engineer",
        PositionInfo: "Info about the job",
        Report: "0",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(new Error("Failed to execute query"));
    });

    await createJob(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("Should return a 403 status because position or position info were not provided", async () => {
    const req = {
      body: {
        EmployerID: "8",
        CompanyName: "Google",
        Position: "",
        PositionInfo: "Info about the job",
        Report: "0",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    db.query.mockImplementationOnce((query, params, callback) => {
      callback(null);
    });
    await createJob(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });
});
