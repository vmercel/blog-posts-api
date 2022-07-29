const { Router } = require("express");
const { savePost, saveComment } = require("../controllers/save_post_json");

let blogPosts = require("../database/blogPosts.json");
let blogComments = require("../database/blogComments.json");

const postRouter = new Router();

postRouter.get("/", (req, res) => {
  res.json(blogPosts);
});

postRouter.get("/:id", (req, res) => {
  const findPost = blogPosts.find((post) => post.id === req.params.id);
  if (!findPost) {
    res.status(404).send("Post with id was not found");
  } else {
    res.json(findPost);
  }
});

postRouter.post("/", (req, res) => {
  blogPosts.push(req.body);
  savePost(blogPosts);
  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

postRouter.put("/:id", (req, res) => {

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

postRouter.delete("/:id", (req, res) => {
  blogPosts = blogPosts.filter((post) => post.id !== req.params.id);
  savePost(blogPosts);
  res.json({
    status: "success",
    removed: req.params.id,
    newLength: blogPosts.length,
  });
});



module.exports = postRouter;
