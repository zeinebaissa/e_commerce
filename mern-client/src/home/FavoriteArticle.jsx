import { useState, useEffect } from "react"
import ArticleCards from "../components/ArticleCards"

const FavoriteArticle = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/all-articles").then(res => res.json())
      .then(data => setArticles(data.slice(0, 8)))
  })
    , []
  return (
    <div style={{color:"black"}}>
      <ArticleCards articles={articles} headline="Our Collection"  />
    </div>
  )
}

export default FavoriteArticle
