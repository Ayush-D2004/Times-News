import React from 'react'
import defaultImage from './icon128.png'

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = props

    const displayImage = imageUrl ? imageUrl : defaultImage

    return (
        <div className='my-3'>
            <div className="card" style={{ height: "400px" }}>
                <div style={{ display: "flex", justifyContent: 'flex-end', position: 'absolute', right: 0 }}>
                    <span className='badge rounded-pill bg-dark' style={{ left: '90%', zindex: '1' }}>{source}</span>
                </div>
                <img src={displayImage} className="card-img-top" alt="News" style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body" style={{ flexGrow: 1 }}>
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className='card-text'> <small className="text-muted">By {author} on {new Date(date).toDateString()}</small></p>
                    <a href={newsUrl} target="__blank" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
