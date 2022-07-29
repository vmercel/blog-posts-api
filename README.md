# BRIEFING #
This repository contains an express app with CRUD operations and their corresponding integration tests.
Tests are implemented using jest and supertest and the API is documented using swagger.

clone this repository:
```
git clone https://github.com/vmeercel/blog-posts-api.git
```
install all require dependencies:
```
$npm install 
```

start the server:
```
$npm start
```

run tests:
```
$npm test
```

Generate API documentation:
```
$npm start-gendoc
```
when server is started, posts are accessible at
```
http://localhost:3000/posts
```
comments are accessible at
```
http://localhost:3000/comments
```
# ADDITIONAL INFO #

blog post schema has the form:
```
{
id: string,
parentId: string,
content: string,
owner: string
}
```
The parentId could be referencing a post or another comment. This enables nesting of comments. owner is the user or author of the post/comment.

