const express = require("express"); // import express
const postRoutes = require("../routes/post-routes"); //import file we are testing
const { saveComment } = require("../controllers/save_comment_json");
const request = require("supertest"); // supertest is a framework that allows to easily test web apis
const bodyParser = require("body-parser");

jest.mock("../controllers/save_comment_json", () => ({
  saveComment: jest.fn(),
}));

jest.mock("../database/blogComments.json", () => [
  {
    id: "MI",
    parentId: "MI",
    content: "Lansing",
    owner: "Gretchen Whitmer",
  },
  {
    id: "GA",
    parentId: "GA",
    content: "Atlanta",
    owner: "Brian Kemp",
  },
]); //callback function with mock data

const app = express(); //an instance of an express // a fake express app
app.use(bodyParser.json()); //this made it work
app.use("/comments", commentRoutes); //



describe("testing-comment-routes", () => {
  it("GET /comments - success", async () => {
    const { body } = await request(app).get("/comments"); //use the request function that we can use the app// save the response to body variable
    expect(body).toEqual([
      {
        id: "MI",
        parentId: "MI",
        content: "Lansing",
        owner: "Gretchen Whitmer",
      },
      {
        id: "GA",
        parentId: "GA",
        content: "Atlanta",
        owner: "Brian Kemp",
      },
    ]);
    firstComment = body[0];
    // console.log(firstComment);
  });
  it("GET /comments/MI - succes", async () => {
    const { body } = await request(app).get(`/comments/${firstComment.id}`);
    expect(body).toEqual(firstComment);
  });

  it("POST /comments - success", async () => {
    let stateObj = {
      id: "AL",
      parentId: "AL",
      content: "Montgomery",
      owner: "Kay Ivey",
    };
    const { body } = await request(app).post("/comments").send(stateObj);
    expect(body).toEqual({
      status: "success",
      stateInfo: {
        id: "AL",
        parentId: "AL",
        content: "Montgomery",
        owner: "Kay Ivey",
      },
    });
    expect(saveComment).toHaveBeenCalledWith([
      {
        id: "MI",
        parentId: "MI",
        content: "Lansing",
        owner: "Gretchen Whitmer",
      },
      {
        id: "GA",
        parentId: "GA",
        content: "Atlanta",
        owner: "Brian Kemp",
      },
      {
        id: "AL",
        parentId: "AL",
        content: "Montgomery",
        owner: "Kay Ivey",
      },
    ]);
    expect(saveComment).toHaveBeenCalledTimes(1);
  });
  it("PUT /comments/MI - success", async () => {
    let stateObj = {
      id: "MI",
      parentId: "MI",
      content: "Lansing",
      owner: "Joe Whitmer",
    };
    const response = await request(app).put("/comments/MI").send(stateObj);
    expect(response.body).toEqual({
      status: "success",
      stateInfo: {
        id: "MI",
        parentId: "MI",
        content: "Lansing",
        owner: "Joe Whitmer",
      },
    });
    expect(saveComment).toHaveBeenCalledWith([
      {
        id: "MI",
        parentId: "MI",
        content: "Lansing",
        owner: "Joe Whitmer",
      },
      {
        id: "GA",
        parentId: "GA",
        content: "Atlanta",
        owner: "Brian Kemp",
      },
      {
        id: "AL",
        parentId: "AL",
        content: "Montgomery",
        owner: "Kay Ivey",
      },
    ]);
    expect(response.statusCode).toEqual(200);
  });
  it("DELETE /comments/MI - success", async () => {
    const { body } = await request(app).delete("/comments/MI");
    expect(body).toEqual({
      status: "success",
      removed: "MI",
      newLength: 2,
    });
    expect(saveComment).toHaveBeenCalledWith([
      {
        id: "GA",
        parentId: "GA",
        content: "Atlanta",
        owner: "Brian Kemp",
      },
      {
        id: "AL",
        parentId: "AL",
        content: "Montgomery",
        owner: "Kay Ivey",
      },
    ]);
  });
});
