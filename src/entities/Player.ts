import mongoose from 'mongoose';

const Player = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  age: { type: Number, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  position: { type: String, trim: true, required: true },
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

export default mongoose.model('Player', Player);
