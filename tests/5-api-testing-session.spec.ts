import { test, request, expect } from "@playwright/test";

test("Request Get 200", async () => {

    const httpContext = await request.newContext({
        extraHTTPHeaders: {
            "auth": ""
        }
    });

    const resp = await httpContext.get("https://reqres.in/api/users/2");
    console.log(resp.status(), resp.statusText());

    const body = (await resp.body()).toString();
    console.log("body = ", body);

    const json = JSON.parse(body);
    console.log("json = ", json);
    console.log("email = ", json.data.email);

});

test("Request Get 404", async () => {
    const httpContext = await request.newContext();
    const resp = await httpContext.get("https://reqres.in/api/users/23");
    console.log(resp.status(), resp.statusText());

    expect(resp.status()).toEqual(404);
});

const endpoints = [
    {
        endpoint: "https://reqres.in/api/users/23",
        expectedStatus: 404,
        expectedMessage: "Not Found"
    },
    {
        endpoint: "https://reqres.in/api/users/2",
        expectedStatus: 200,
        expectedMessage: "OK"
    }
]
for (const scenario of endpoints) {
    test(`Request Get ${scenario.endpoint}`, async () => {
        const httpContext = await request.newContext();
        const resp = await httpContext.get(scenario.endpoint);
        console.log(resp.status(), resp.statusText());

        expect(resp.status()).toEqual(scenario.expectedStatus);
    });
}

test("Request Post user", async () => {
    const httpContext = await request.newContext();
    const resp = await httpContext.post(
        "https://reqres.in/api/users",
        {
            data: {
                name: "morpheus",
                job: "leader"
            }
        });
    console.log(resp.status(), resp.statusText());

    const body = (await resp.body()).toString();
    console.log("body = ", body);
    const json = JSON.parse(body);
    console.log("json = ", json);
});

test("Request Put user", async () => {
    const httpContext = await request.newContext();
    const resp = await httpContext.put(
        "https://reqres.in/api/users/2",
        {
            data: {
                name: "morpheus",
                job: "leader edit"
            }
        });
    console.log(resp.status(), resp.statusText());

    const body = (await resp.body()).toString();
    console.log("body = ", body);
    const json = JSON.parse(body);
    console.log("json = ", json);
});

test("Request delete", async () => {
    const httpContext = await request.newContext();
    const resp = await httpContext.delete("https://reqres.in/api/users/2");
    console.log(resp.status(), resp.statusText());

    expect(resp.status()).toEqual(204);
});

const scenarios = [
    {
        name: "get user",
        method: "GET",
        endpoint: "https://reqres.in/api/users/2",
        payload: {},
        statusCode: 200
    },
    {
        name: "post user",
        method: "POST",
        endpoint: "https://reqres.in/api/users",
        payload: {
            name: "Jojoe",
            job: "QA"
        },
        statusCode: 201
    },
    {
        name: "put user",
        method: "PUT",
        endpoint: "https://reqres.in/api/users/2",
        payload: {
            name: "Jojoe",
            job: "QA Senior"
        },
        statusCode: 200
    },
    {
        name: "delete user",
        method: "DELETE",
        endpoint: "https://reqres.in/api/users/2",
        payload: {},
        statusCode: 204
    },
]
for (const scenario of scenarios) {
    test(`Sent API Request ${scenario.method} to ${scenario.name} should receive response code ${scenario.statusCode}`, async () => {
        const httpContext = await request.newContext();
        const resp = await httpContext.fetch(scenario.endpoint,
            {
                method: scenario.method,
                data: scenario.payload
            });
        console.log(resp.status(), resp.statusText());

        expect(resp.status()).toEqual(scenario.statusCode);
    });
}