const request = require('supertest');
const app = require('../server'); 
let items = require('../fakeDb');

let popsicle = { name: "popsicle", price: 1.45 };

beforeEach(function() {
    items.push(popsicle);
});

afterEach(function() {
    // reset the items array after each test
    items.length = 0;
});

describe("GET /items", function() {
    test("Gets a list of items", async function() {
        const response = await request(app).get(`/items`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([popsicle]);
    });
});

describe("POST /items", function() {
    test("Adds a new item to the list", async function() {
        const response = await request(app)
            .post(`/items`)
            .send({
                name: "cheerios",
                price: 3.40
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ added: { name: "cheerios", price: 3.40 } });
    });
});

describe("PATCH /items/:name", function() {
    test("Updates an item", async function() {
        const response = await request(app)
            .patch(`/items/${popsicle.name}`)
            .send({
                name: "new popsicle",
                price: 2.45
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ updated: { name: "new popsicle", price: 2.45 } });
    });
});

describe("DELETE /items/:name", function() {
    test("Deletes an item", async function() {
        const response = await request(app).delete(`/items/${popsicle.name}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Deleted" });
    });
});
