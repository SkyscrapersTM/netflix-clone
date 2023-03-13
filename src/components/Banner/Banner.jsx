import { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../services/axios'
import requests from '../../services/requests'
import randomMovie from '../../utilities/randomMovie'

const Banner = () => {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals)
      const pickMovie = request.data.results[randomMovie(request)]
      setMovie(pickMovie)
    }

    fetchData()
  }, [])

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string
  }

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: 'center center'
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>
        <p className='banner__description'>{truncate(movie?.overview, 150)}</p>
      </div>

      <div className='banner__fadeBottom' />
    </header>
  )
}

export default Banner
