import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from 'mongodb';

const app = express();

const port = 8000;

//must be above the routes, parses JSON object from POST req and add body
//property req param with matching route
app.use(bodyParser.json());

app.get("/api/articles/:name", async (req, res) => {
  try {
    const articleName = req.params.name;

    //setting up connection with MongodB
    const client = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db("my-blog");
  
  //query database
  const articleInfo = await db.collection("articles").findOne({ name: articleName });
  //instead of send using json as works better with json data
  res.status(200).json(articleInfo);
  
  //close connection with database
  client.close();
  }catch(error) {
    //internal server error
res.status(500).json({ message: "Error connecting to db", error});
  }

})

app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;
  articlesInfo[articleName].upvotes += 1;
  res
    .status(200)
    .send(
      `${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!!!`
    );
});

app.post("/api/articles/:name/add-comment", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  articlesInfo[articleName].comments.push({ username, text });

  res.status(200).send(articlesInfo[articleName]);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
