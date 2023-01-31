const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require("supertest");
const app = require('../../app');

const Contestant = require('../../models/contestants');



let mongo;
beforeAll(async()=>{
    mongo = await MongoMemoryServer.create();
})

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

describe("Rest API",()=>{
    describe("Creating Vote",()=>{
        test("test status code 201",async()=>{
            const contestants = await Contestant.find({});
            let x = Math.floor((Math.random() * (contestants.length)));
            const contestantId = contestants[x].id;
            const time = new Date().toISOString();
    
            const response = await request(app).post("/vote").send({contestantId: contestantId, timestamp: time});
            expect(response.statusCode).toEqual(201);
            expect(['data', 'message', 'success'].sort()).toEqual(Object.keys(response.body).sort());
            if(response.body.success) {
                const expected = {
                    contestant: {name: contestants[x].name, id: contestants[x].id },
                    votedAt: time
                }
                expect(response.body.data).toEqual(expect.objectContaining(expected));
            }
        });

        test("test status code 422 missing data",async()=>{
            const time = new Date().toISOString();
    
            const response = await request(app).post("/vote").send({timestamp: time});
            expect(response.statusCode).toEqual(422);
            expect(response.body.success).toEqual(false);
            expect(['data', 'message', 'success'].sort()).toEqual(Object.keys(response.body).sort());
        });

        test("test status code 422 invalid contestant",async()=>{
            const time = new Date().toISOString();
    
            const response = await request(app).post("/vote").send({contestantId: 'invalid', timestamp: time});
            expect(response.statusCode).toEqual(422);
            expect(response.body.success).toEqual(false);
            expect(['data', 'message', 'success'].sort()).toEqual(Object.keys(response.body).sort());
        });
    });
   
    describe("get contestants",()=>{
        test("test status code 200",async()=>{
            const response = await request(app).get("/contestants").send();
            expect(response.statusCode).toEqual(200);
            expect(['data', 'message', 'success'].sort()).toEqual(Object.keys(response.body).sort());
            if(response.body.data.length > 0) {
                response.body.data.forEach(obj => {
                    expect(['name', 'count', 'id'].sort()).toEqual(Object.keys(obj).sort());
                });

            }
        })
    })
})


