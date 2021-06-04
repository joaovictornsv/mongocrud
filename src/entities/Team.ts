import mongoose from 'mongoose';

const Team = new mongoose.Schema({
  name: {
    type: String, trim: true, required: true,
  },
  coach: { type: String, trim: true, default: '' },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
});

export default mongoose.model('Team', Team);
