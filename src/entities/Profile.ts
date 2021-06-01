import mongoose from 'mongoose';

const Profile = new mongoose.Schema({
  _id: { type: String, required: true },
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  age: { type: Number, default: 0 },
  team: { type: String, trim: true, default: '' },
  position: { type: String, trim: true, default: '' },
});

export default mongoose.model('Profile', Profile);
