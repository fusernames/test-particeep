import { Card, CardContent, Grid, IconButton, Typography, useTheme } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { Close, ThumbDown, ThumbsUpDown, ThumbUp } from 'mdi-material-ui'

export default function MovieCard({ movie, handleLikeMovie, handleDeleteMovie }) {
  const theme = useTheme()
  const ratio = (movie.likes / (movie.likes + movie.dislikes)) * 100
  return (
    <Card>
      <CardContent>
        <Typography>
          <strong style={{ fontWeight: 600 }}>{movie.title}</strong>
        </Typography>
        <Typography variant="body2">{movie.category}</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            style={{
              color:
                movie.liked === true
                  ? theme.palette.primary.main
                  : movie.liked === false
                  ? theme.palette.error.main
                  : undefined,
            }}
            onClick={() => handleLikeMovie(movie.id)}
          >
            {movie.liked ? <ThumbUp /> : movie.liked === false ? <ThumbDown /> : <ThumbsUpDown />}
          </IconButton>
          <IconButton onClick={() => handleDeleteMovie(movie.id)}>
            <Close fontSize="small" />
          </IconButton>
        </div>
        <div style={{ width: '100%', height: 3, backgroundColor: 'rgba(0, 0, 0, .1)' }}>
          <div
            style={{
              background: theme.palette.primary.main,
              width: `${ratio}%`,
              height: 3,
              borderRadius: theme.shape.borderRadius,
            }}
          ></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="textSecondary">
            {movie.likes}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {movie.dislikes}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}
