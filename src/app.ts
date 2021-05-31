import 'reflect-metadata'
import express from 'express'

const app = express();

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/mongocrud', {useNewUrlParser: true, useUnifiedTopology: true});

export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!');
  
});

app.get('/api', (req, res) => {
  return res.status(200).json({message: "hello"})
})

export { app }
