import { Grid, MenuItem, Select, TextField } from '@material-ui/core'
import { MovieSettingsOutline } from 'mdi-material-ui'
import React, { useCallback, useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import Pagination from '@material-ui/lab/Pagination'

export default function Movies({ allMovies }) {
  const [movies, setMovies] = useState(allMovies)
  const [categories, setCategories] = useState({})
  const [filteredMovies, setFilteredMovies] = useState(movies)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [limit, setLimit] = useState(8)
  const [page, setPage] = useState(1)

  // 1. EFFECTS
  useEffect(() => {
    // set categories list when movies list change
    let newCategories = {}
    setCategories(
      movies.map((x) => {
        if (newCategories[x.category]) newCategories[x.category] += 1
        else newCategories[x.category] = 1
      })
    )
    setCategories(newCategories)
  }, [movies])

  useEffect(() => {
    // filter the movies when selected categories change
    if (selectedCategories.length)
      setFilteredMovies(movies.filter((x) => selectedCategories.includes(x.category)))
    else setFilteredMovies(movies)
  }, [movies, selectedCategories])

  // 2. HANDLERS
  const handleCategoryChange = useCallback((e) => {
    setSelectedCategories(e.target.value)
  }, [])

  const handleLimitChange = useCallback((e) => {
    setLimit(e.target.value)
  }, [])

  const handleLikeMovie = useCallback(
    (id) => {
      // toogle moovie like: none => like => dislike => none... And update counts
      const moviesCopy = [...movies]
      for (let i in moviesCopy) {
        if (moviesCopy[i].id === id) {
          if (moviesCopy[i].liked === undefined) {
            moviesCopy[i].likes += 1
            moviesCopy[i].liked = true
          } else if (moviesCopy[i].liked === true) {
            moviesCopy[i].likes -= 1
            moviesCopy[i].dislikes += 1
            moviesCopy[i].liked = false
          } else if (moviesCopy[i].liked === false) {
            moviesCopy[i].dislikes -= 1
            moviesCopy[i].liked = undefined
          }
        }
      }
      setMovies(moviesCopy)
    },
    [movies]
  )

  const handleDeleteMovie = useCallback(
    (id) => {
      const [movie] = movies.filter((x) => x.id === id)
      const moviesCopy = movies.filter((x) => x.id !== id)
      // delete category from selected categories if movie was the last of its category
      if (categories[movie.category] === 1)
        setSelectedCategories(selectedCategories.filter((name) => name !== movie.category))
      setMovies(moviesCopy)
    },
    [movies, categories, selectedCategories]
  )

  const handlePageChange = useCallback((e, value) => {
    setPage(value)
  }, [])

  // 3. COMPONENT
  return (
    <>
      <Grid container spacing={2} style={{ marginBottom: 24 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Categories"
            fullWidth
            onChange={handleCategoryChange}
            value={selectedCategories}
            select
            SelectProps={{ multiple: true }}
          >
            {Object.keys(categories).map((name) => (
              <MenuItem value={name} key={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField label="Per page" fullWidth value={limit} onChange={handleLimitChange} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {filteredMovies &&
          filteredMovies.map((movie, i) => {
            // handle page
            if (limit && i >= limit * page) return null
            if (limit && page > 1 && i < limit * (page - 1)) return null
            return (
              <Grid item xs={12} sm={6} md={3} key={movie.id}>
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  handleLikeMovie={handleLikeMovie}
                  handleDeleteMovie={handleDeleteMovie}
                />
              </Grid>
            )
          })}
      </Grid>
      <Pagination
        style={{ marginTop: 32 }}
        count={Math.ceil(filteredMovies.length / limit)}
        color="primary"
        onChange={handlePageChange}
      />
    </>
  )
}
