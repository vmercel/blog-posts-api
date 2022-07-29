const fs = require("fs");
const path = require("path");

const savePost = (blogPosts) => {
  fs.writeFile(
    path.join(__dirname, ".", "blogPosts.json"),
    JSON.stringify(blogPosts, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};


module.exports = { savePost };
