import React, { useState, useEffect} from 'react'

import Feed from '../components/Feed'

const Home = () => {

    const [articles, setArticles] = useState(null)

    useEffect(() => {

        const formatTitle = (title) => {
            for (let i = title.length - 1; i > 0; i--) {
                if (title[i] === "-") {
                    title = title.slice(0, i - 1)
                    break
                }
            }
            return title
        }

        const filterArticles = (response) => {
            console.log(response[0])
            for (let i = 0; i < response.length; i++) { 
                if (response[i].author === null || response[i].urlToImage === null) {
                    response.splice(i, 1)
                    continue
                }
                response[i].title = formatTitle(response[i].title)
            }
            return response
        }

        const fetchHomeArticles = async () => {
            const response = await fetch(`https://adrian-news-app-api.herokuapp.com/articles`)
            const data = await response.json()
            const filteredArticles = filterArticles(data.articles)
            setArticles([...filteredArticles])
        }

        fetchHomeArticles()

    }, [])

    const loading = () => <h2>Fetching Articles...</h2>

    const loaded = () => {
        return (
            <>
                {/* <div className="page-title">
                    <h2>Home</h2>
                    <div></div>
                </div> */}
                <div className="headline">
                    <a 
                        target="_blank" 
                        rel="noreferrer" 
                        href={articles[0].url} 
                        className="title"
                    >
                        <div className="source">
                            {articles[0].source.name}
                            <div></div>
                        </div>
                        {articles[0].title}
                    </a>
                    <a
                        target="_blank" 
                        rel="noreferrer" 
                        href={articles[0].url} 
                    >
                        <img src={articles[0].urlToImage} alt={articles[0].title}/>
                    </a>
                    <a 
                        target="_blank" 
                        rel="noreferrer" 
                        href={articles[0].url} 
                        className="description"
                    >
                        {articles[0].description}
                    </a>
                </div>
                <Feed articles={articles}/>
            </>
        )
    }

    return (
        <div className="main">
            { articles ? loaded() : loading()}
        </div>
    )
}

export default Home