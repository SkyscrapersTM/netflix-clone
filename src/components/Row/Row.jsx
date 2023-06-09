import { useEffect, useState } from 'react'
import axios from '../../services/axios'
import './Row.css'

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovie] = useState([])

  const baseUrl = 'https://image.tmdb.org/t/p/original'

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setMovie(request.data.results)
      return request
    }

    fetchData()
  }, [fetchUrl])

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                key={movie.id}
                src={`${baseUrl}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  )
}

export default Row
