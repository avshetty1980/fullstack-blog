import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from 'mongodb';
import path from "path";

const app = express();

const port = 8000;

//where to serve static files (ike images) from
app.use(express.static(path.join(__dirname, "/build")))

//must be above the routes, parses JSON object from POST req and add body
//property req param with matching route
app.use(bodyParser.json());

//function that connects to MongodB
const withDB = async (operations, res) => {
  try {
    
    //setting up connection with MongodB
    const client = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db("my-blog");

  await operations(db);
    
  //close connection with database
  client.close();
  }catch(error) {
    //internal server error
res.status(500).json({ message: `Error connecting to db and getting ${articleName}`, error});
  }
}

app.get("/api/articles/:name", async (req, res) => {

  withDB(async (db) => {
    const articleName = req.params.name;
  
  //query database
  const articleInfo = await db.collection("articles").findOne({ name: articleName });
  //instead of send using json as works better with json data
  res.status(200).json(articleInfo);  
  }, res);

})

app.post("/api/articles/:name/upvote", async (req, res) => {
  
  //articlesInfo[articleName].upvotes += 1;
  //res
  //  .status(200)
  //  .send(
  //    `${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!!!`
  //  );

  const articleName = req.params.name;

  withDB(async (db) => {
    
   
    const articleInfo = await  db.collection("articles").findOne({ name: articleName });
 
    //to increment upvotes in MongodB
    await db.collection("articles").updateOne({ name: articleName }, {
     "$set": {
       upvotes: articleInfo.upvotes + 1,
     },
     }, res);
 
     //get update version from MongoDB
     const updatedArticleInfo = await  db.collection("articles").findOne({ name: articleName });
 
     res.status(200).json(updatedArticleInfo);
  });
   

});

app.post("/api/articles/:name/add-comment", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  //articlesInfo[articleName].comments.push({ username, text });

  //res.status(200).send(articlesInfo[articleName]);
withDB(async (db) => {
const articleInfo = await db.collection("articles").findOne({ name: articleName});
await db.collection("articles").updateOne({ name: articleName}, {
  "$set": {
    comments: articleInfo.comments.concat({ username, text }),
  },
});
const updatedArticleInfo = await db.collection("articles").findOne({ name: articleName });
res.status(200).json(updatedArticleInfo);

}, res);

});

//all routes not caught by routes defined above should be paeed to app
app.get("*", (req, res) => {
  res.send(path.join(__dirname + "/build/index.html"));
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
