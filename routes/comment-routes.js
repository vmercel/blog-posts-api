const { Router } = require("express");
const { saveComment } = require("../controllers/save_comment_json");
let blogComments = require("../database/blogComments.json");

const commentRouter = new Router();




commentRouter.get("/comments/", (req, res) => {
  res.json(blogComments);
});

commentRouter.get("/comments/:id", (req, res) => {
  const findComment = blogComments.find((comment) => comment.id === req.params.id);
  if (!findComment) {
    res.status(404).send("Comment with id was not found");
  } else {
    res.json(findComment);
  }
});

commentRouter.post("/comments/", (req, res) => {
  blogComments.push(req.body);
  saveComment(blogComments);
  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

commentRouter.put("/comments/:id", (req, res) => {

  blogComments = blogComments.map((comment) => {
    if (comment.id === req.params.id) {
      return req.body;
    } else {
      return comment;
    }
  });
  saveComment(blogComments);

  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

commentRouter.delete("/comments/:id", (req, res) => {
  blogComments = blogComments.filter((comment) => comment.id !== req.params.id);
  saveComment(blogComments);
  res.json({
    status: "success",
    removed: req.params.id,
    newLength: blogComments.length,
  });
});

module.exports = commentRouter;
