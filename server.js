const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

let blogPosts = require("./database/blogPosts.json");
let blogComments = require("./database/blogComments.json");

const app = express();

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const savePost = () => {
  fs.writeFile(
    "./database/blogPosts.json",
    JSON.stringify(blogPosts, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};

app.get("/posts", (req, res) => {
  res.json(blogPosts);
});

app.get("/posts/:id", (req, res) => {
  const findPost = blogPosts.find((post) => post.id === req.params.id);
  if (!findPost) {
    res.status(404).send("post with id was not found");
  } else {
    res.json(findPost);
  }

});

app.post("/posts", bodyParser.json(), (req, res) => {
  blogPosts.push(req.body);
  savePost();
  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

app.put("/posts/:id", bodyParser.json(), (req, res) => {

  blogPosts = blogPosts.map((post) => {
    if (post.id === req.params.id) {
      return req.body;
    } else {
      return post;
    }
  });
  savePost();

  res.json({
    status: "success",
    stateInfo: req.body,
  });
  //   }
});

app.delete("/posts/:id", (req, res) => {
  blogPosts = blogPosts.filter((post) => post.id !== req.params.id);
  savePost();
  res.json({
    status: "success",
    removed: req.params.id,
    newLength: blogPosts.length,
  });
});



const saveComment = () => {
  fs.writeFile(
    "./database/blogComments.json",
    JSON.stringify(blogComments, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};

app.get("/comments", (req, res) => {
  res.json(blogComments);
});

app.get("/comments/:id", (req, res) => {
  const findComment = blogComments.find((post) => post.id === req.params.id);
  if (!findComment) {
    res.status(404).send("comment with id was not found");
  } else {
    res.json(findComment);
  }

});

app.post("/comments", bodyParser.json(), (req, res) => {
  blogComments.push(req.body);
  saveComment();
  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

app.put("/comments/:id", bodyParser.json(), (req, res) => {

  blogComments = blogComments.map((post) => {
    if (post.id === req.params.id) {
      return req.body;
    } else {
      return post;
    }
  });
  saveComment();

  res.json({
    status: "success",
    stateInfo: req.body,
  });
  //   }
});

app.delete("/comments/:id", (req, res) => {
  blogPosts = blogPosts.filter((post) => post.id !== req.params.id);
  saveComment();
  res.json({
    status: "success",
    removed: req.params.id,
    newLength: blogComments.length,
  });
});


app.listen(3000, () => {
  console.log(`Mercel Blog API is running at http://localhost:3000`);
});