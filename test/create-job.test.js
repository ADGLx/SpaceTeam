const request = require("supertest");
const app = require('../Server/Server.js')
const validateJob = require('../Server/validateJob')


//First tests will check the validateJob method:
test('Should return false because the position field is empty', () => {
    expect(validateJob("", "info details test")).toBe(false)
})

test('Should return false because the position info field is empty', () => {
    expect(validateJob("Position title test", "")).toBe(false)
})

test('Should return true because both fields are set', () => {
    expect(validateJob("Position title test", "info details")).toBe(true)
})

//Now we test for valid and invalid db query:
describe('POST /api/create-job', () => {
    test('Should return a 200 status if query is valid', async () => {
        const response = await(request(app))
        .post('/api/create-job')
        .send({
            //Valid Input:
            EmployerID : '10' ,
            CompanyName : 'Google',
            Position : 'Engineer',
            PositionInfo : 'Info about the job',
            Report : '0'
        });
        expect(response.status).toBe(200);
    });

    test('Should return a 500 status because of missing input causing a server error', async () => {
        const response = await(request(app))
        .post('/api/create-job')
        .send({
            //Valid Input:
            EmployerID : '' ,
            CompanyName : 'Google',
            Position : 'Engineer',
            PositionInfo : 'Info about the job',
            Report : '0'
        });
        expect(response.status).toBe(500);
    });

    test('Should return a 403 status because position or position info were not provided', async () => {
        const response = await(request(app))
        .post('/api/create-job')
        .send({
            //Valid Input:
            EmployerID : '10' ,
            CompanyName : 'Google',
            Position : '',
            PositionInfo : 'Info about the job',
            Report : '0'
        });
        expect(response.status).toBe(403);
    });

});