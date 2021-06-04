import mongoose from 'mongoose';

const Player = new mongoose.Schema({
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  age: { type: Number, default: 0 },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  position: { type: String, trim: true, default: '' },
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

export default mongoose.model('Player', Player);
