import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const Team = new mongoose.Schema({
  _id: {
    type: String, trim: true, required: true, default: () => uuid(),
  },
  name: {
    type: String, trim: true, required: true, default: '',
  },
  coach: { type: String, trim: true, default: '' },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
});

export default mongoose.model('Team', Team);
