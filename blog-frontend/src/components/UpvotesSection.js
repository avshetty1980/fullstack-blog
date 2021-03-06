import React from "react";

const UpvotesSection = ({ articleName, upvotes, setArticleInfo }) => {
    
const upVoteArticle = async () => {
   const result =  await fetch(`/api/articles/${articleName}/upvote`, {
        method: "post",
    });

    const body = await result.json();
    setArticleInfo(body);
}

    return (
    <div className="upvotes-section">

<button onClick={upVoteArticle}>Add Upvote</button>
    {/* <p>This post has been upvoted {articleInfo.upvotes} times</p> */}
    {/* not passing the entire articlesIngo object */}
    <p>This post has been upvoted {upvotes} times</p>

    </div>
)};

export default UpvotesSection;