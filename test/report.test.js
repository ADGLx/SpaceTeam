const report = require('../Server/report');
const db = require('../Server/database');

jest.mock('../Server/database');

describe('Report function', () => {
    test('Should return 200 status upon successful report of a job listing', async () => {
        //Mocking request and response objects
        const req = {
            body: {
                jobID: {
                    jobID: "47"
                }
            }
        };
        const res = { 
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        // Mocking the database query response
    db.query.mockImplementationOnce((query, params, callback) => {
        callback(null, {jobID: '47'});
      });
  
      // Calling the login function with mocked request and response objects
      await report(req, res);
  
      // Asserting that the response status and send functions were called with the expected parameters
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Should return 400 status upon a invalid db entry', async () => {
        //Mocking request and response objects
        const req = {
            body: {
                jobID: {
                    jobID: "0" //non existent element
                }
            }
        };
        const res = { 
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        // Mocking the database query response
    db.query.mockImplementationOnce((query, params, callback) => {
        callback(null, [], {});
      });
  
      // Calling the login function with mocked request and response objects
      await report(req, res);
  
      // Asserting that the response status and send functions were called with the expected parameters
      expect(res.status).toHaveBeenCalledWith(403);
    });

})