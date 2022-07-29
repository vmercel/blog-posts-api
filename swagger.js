const swaggerAutogen = require("swagger-autogen")()

const doc = {
    info: {
        version: "1.0.0",
        title: "Mercel Blog API",
        description: "Blog API."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            "name": "Posts",
            "description": "Posts endpoints"
        },
        {
            "name": "comments",
            "description": "comment endpoints"
        },
    ],
    

        PostModel: {
            $category: "6064e654b5c7475bac63ad22",
            $title: "Elon Musk Admits He Wants to Travel to Mars Because No One Hates Him There Yet",
            $body: "AUSTIN, Texas — Wiping tears from his eyes at a recent press conference, SpaceX CEO Elon Musk revealed that the reason he’s so keen on traveling to Mars is not for the potential benefits to science, but because it’s the one place he can think of where no one hates him yet.",
        },
        
        CommentModel: {
            $post: "606576d16bb28e33ecf2872c",
            $body: "That's very funny (:",
        }
    
};

const outputFile = "./swagger_output.json";
const endpointFiles = ["./routes/post-routes.js"];

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    require("./routes/post-routes.js");
});