const randomMovie = (Movies) => {
  return Math.floor(Math.random() * Movies.data.results.length - 1)
}

export default randomMovie
