import React from "react";

import ArticlesList from "../components/ArticlesList";
import articles from "./article-content";
import articleContent from "./article-content";

const ArticlesListPage = () => (
  <>
    <h1>Articles</h1>
    <ArticlesList articles={articleContent} />
  </>
);

export default ArticlesListPage;
