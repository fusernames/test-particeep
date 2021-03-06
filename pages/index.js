import { Typography, useTheme } from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import Movies from '../components/Movies'

export default function Home({ allMovies }) {
  const theme = useTheme()
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Test Particeep
      </Typography>
      <Movies allMovies={allMovies} />
    </>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/movies')
  const allMovies = await res.json()
  return { allMovies }
}
