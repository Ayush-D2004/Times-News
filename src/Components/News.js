import React, {useEffect, useState} from 'react'

import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingPage from './LoadingPage';

const News = ({ pageSize = 8, category = 'general', setProgress, apiKey }) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`; 
        setLoading(true);
        try {
            let data = await fetch(url);
            setProgress(30);
            let parsedData = await data.json();
            console.log(parsedData);
            if (parsedData.articles) {
                setArticles(parsedData.articles);
                setTotalResults(parsedData.totalResults);
            } else {
                console.error("No articles found");
            }
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
            setProgress(100);
        }
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)} - Time's New`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {   
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page+1}&pageSize=${pageSize}`;
        setPage(page+1) 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>Time's New - Top {capitalizeFirstLetter(category)} Headlines</h1>
                {loading && <LoadingPage />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<LoadingPage/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}


News.propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func,
    apiKey: PropTypes.string,
}

export default News