import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const Player = new mongoose.Schema({
  _id: { type: String, required: true, default: () => uuid() },
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
