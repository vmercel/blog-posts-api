const fs = require("fs");
const path = require("path");


const saveComment = (blogComments) => {
  fs.writeFile(
    path.join(__dirname, ".", "blogComments.json"),
    JSON.stringify(blogComments, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};


module.exports = { saveComment };
