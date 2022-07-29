const express = require("express"); // import express
const postRoutes = require("../routes/post-routes"); //import file we are testing
const { savePost } = require("../controllers/save_post_json");
const request = require("supertest"); // supertest is a framework that allows to easily test web apis
const bodyParser = require("body-parser");

jest.mock("../controllers/save_post_json", () => ({
  savePost: jest.fn(),
}));

jest.mock("../database/blogPosts.json", () => [
  {
    id: "MI",
    content: "Lansing",
    owner: "Gretchen Whitmer",
  },
  {
    id: "GA",
    content: "Atlanta",
    owner: "Brian Kemp",
  },
]); //callback function with mock data

const app = express(); //an instance of an express // a fake express app
app.use(bodyParser.json()); //this made it work
app.use("/posts", postRoutes); //



describe("testing-post-routes", () => {
  it("GET /posts - success", async () => {
    const { body } = await request(app).get("/posts"); //use the request function that we can use the app// save the response to body variable
    expect(body).toEqual([
      {
        id: "MI",
        content: "Lansing",
        owner: "Gretchen Whitmer",
      },
      {
        id: "GA",
        content: "Atlanta",
        owner: "Brian Kemp",
      },
    ]);
    firstPost = body[0];
    // console.log(firstPost);
  });
  it("GET /posts/MI - succes", async () => {
    const { body } = await request(app).get(`/posts/${firstPost.id}`);
    expect(body).toEqual(firstPost);
  });

  it("POST /posts - success", async () => {
    let stateObj = {
      id: "AL",
      content: "Montgomery",
      owner: "Kay Ivey",
    };
    const { body } = await request(app).post("/posts").send(stateObj);
    expect(body).toEqual({
      status: "success",
      stateInfo: {
        id: "AL",
        content: "Montgomery",
        owner: "Kay Ivey",
      },
    });
    expect(savePost).toHaveBeenCalledWith([
      {
        id: "MI",
        content: "Lansing",
        owner: "Gretchen Whitmer",
      },
      {
        id: "GA",
        content: "Atlanta",
        owner: "Brian Kemp",
      },
      {
        id: "AL",
        content: "Montgomery",
        owner: "Kay Ivey",
      },
    ]);
    expect(savePost).toHaveBeenCalledTimes(1);
  });
  it("PUT /posts/MI - success", async () => {
    let stateObj = {
      id: "MI",
      content: "Lansing",
      owner: "Joe Whitmer",
    };
    const response = await request(app).put("/posts/MI").send(stateObj);
    expect(response.body).toEqual({
      status: "success",
      stateInfo: {
        id: "MI",
        content: "Lansing",
        owner: "Joe Whitmer",
      },
    });
    expect(savePost).toHaveBeenCalledWith([
      {
        id: "MI",
        content: "Lansing",
        owner: "Joe Whitmer",
      },
      {
        id: "GA",
        content: "Atlanta",
        owner: "Brian Kemp",
      },
      {
        id: "AL",
        content: "Montgomery",
        owner: "Kay Ivey",
      },
    ]);
    expect(response.statusCode).toEqual(200);
  });
  it("DELETE /posts/MI - success", async () => {
    const { body } = await request(app).delete("/posts/MI");
    expect(body).toEqual({
      status: "success",
      removed: "MI",
      newLength: 2,
    });
    expect(savePost).toHaveBeenCalledWith([
      {
        id: "GA",
        content: "Atlanta",
        owner: "Brian Kemp",
      },
      {
        id: "AL",
        content: "Montgomery",
        owner: "Kay Ivey",
      },
    ]);
  });
});




