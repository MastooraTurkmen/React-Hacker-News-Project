import React from 'react'

import { useGlobalContext } from './context'

const Stories = () => {
  const { isLoading, hits } = useGlobalContext();

  if (isLoading) {
    return <div className='loading'></div>
  }

  return (
    <section className="stories">
      {hits.map((story) => {
        const { objectID, num_comments, title, points, url, author } = story
        return <article key={objectID} className="story">
          <h4 className="title">{title}</h4>
          <p className="info">
            {points} points by <span>{author} | </span>
            {num_comments}{''} comments
          </p>
          <div>
            <a target='_blank' href={url} className='read-link'>read more</a>
            <button className="remove-btn">remove</button>
          </div>
        </article>
      })}
    </section>
  )
}

export default Stories
