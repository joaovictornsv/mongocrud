import 'reflect-metadata'
import express from 'express'

const app = express();

app.get('/api', (req, res) => {
  return res.status(200).json({message: "hello"})
})

export { app }
