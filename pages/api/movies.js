import { movies$ } from '../../data/movies'

export default async function handler(req, res) {
  const movies = await movies$
  res.status(200).json(movies)
}
