import React from "react";
import ArticlesList from "../components/ArticlesList";
import NotFoundPage from "./NotFoundPage";
import articleContent from "./article-content";

//React Router passes match as props that contains the URL parameter
const ArticlePage = ({ match }) => {
  const name = match.params.name;

  //find the article whose name property matches the name in the URL
  const article = articleContent.find((article) => article.name === name);
  if (!article) return <NotFoundPage />;

  //only articles other than the current article being displayed
  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );

  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <h3>Other Articles:</h3>
      <ArticlesList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
