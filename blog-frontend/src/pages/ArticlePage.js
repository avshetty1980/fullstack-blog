import React, { useState, useEffect } from "react";
import ArticlesList from "../components/ArticlesList";
import NotFoundPage from "./NotFoundPage";
import articleContent from "./article-content";
import CommentsList from "../components/CommentsList";
import UpvotesSection from "../components/UpvotesSection";
import AddCommentForm from "../components/AddCommentForm";

//React Router passes match as props that contains the URL parameter
const ArticlePage = ({ match }) => {
  const name = match.params.name;

  //find the article whose name property matches the name in the URL
  const article = articleContent.find((article) => article.name === name);


const [ articleInfo, setArticleInfo ] = useState({ upvotes: 0, comments: [] });

//runs every time the component mounts and when component updates
useEffect(() => {
  const fetchData = async () => {
    //omiting http://localhost:8000 as proxy in package.json
const result = await fetch(`/api/articles/${name}`);
const body = await result.json();
console.log(body);
setArticleInfo(body);
  }
  fetchData();
  //setArticleInfo({ upvotes: 3 });
}, [name]);

  if (!article) return <NotFoundPage />;

  //only articles other than the current article being displayed
  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );

  return (
    <>
      <h1>{article.title}</h1>
      <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
 
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
<AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
      <h3>Other Articles:</h3>
      <ArticlesList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
