const { Router } = require("express");
const { savePost } = require("../controllers/save_post_json");
const { saveComment } = require("../controllers/save_comment_json");

let blogPosts = require("./database/blogPosts.json");
let blogComments = require("./database/blogComments.json");

const postRoutes = new Router();
const commentRoutes = new Router();

postRoutes.get("/", (req, res) => {
  res.json(blogPosts);
});

postRoutes.get("/:id", (req, res) => {
  const findPost = blogPosts.find((post) => post.id === req.params.id);
  if (!findPost) {
    res.status(404).send("Post with id was not found");
  } else {
    res.json(findPost);
  }
});

postRoutes.post("/", (req, res) => {
  blogPosts.push(req.body);
  savePost(blogPosts);
  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

postRoutes.put("/:id", (req, res) => {

  blogPosts = blogPosts.map((post) => {
    if (post.id === req.params.id) {
      return req.body;
    } else {
      return post;
    }
  });
  savePost(blogPosts);

  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

postRoutes.delete("/:id", (req, res) => {
  blogPosts = blogPosts.filter((post) => post.id !== req.params.id);
  savePost(blogPosts);
  res.json({
    status: "success",
    removed: req.params.id,
    newLength: blogPosts.length,
  });
});


commentRoutes.get("/", (req, res) => {
  res.json(blogComments);
});

commentRoutes.get("/:id", (req, res) => {
  const findComment = blogComments.find((comment) => comment.id === req.params.id);
  if (!findComment) {
    res.status(404).send("Comment with id was not found");
  } else {
    res.json(findComment);
  }
});

commentRoutes.post("/", (req, res) => {
  blogComments.push(req.body);
  saveComment(blogComments);
  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

commentRoutes.put("/:id", (req, res) => {

  blogComments = blogComments.map((comment) => {
    if (comment.id === req.params.id) {
      return req.body;
    } else {
      return comment;
    }
  });
  save(blogComments);

  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

commentRoutes.delete("/:id", (req, res) => {
  blogComments = blogComments.filter((comment) => comment.id !== req.params.id);
  saveComment(blogComments);
  res.json({
    status: "success",
    removed: req.params.id,
    newLength: blogComments.length,
  });
});

module.exports = {postRoutes, commentRoutes};
