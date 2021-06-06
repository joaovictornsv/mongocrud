import mongoose from 'mongoose';
import 'dotenv/config';

function connectToDatabase() {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.set('useFindAndModify', false);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('Connected!');
  });
}

export default connectToDatabase;
