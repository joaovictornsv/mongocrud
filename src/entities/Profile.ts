import mongoose from 'mongoose'

const Profile = new mongoose.Schema({
  firstName: {type: String},
  lastName:{type: String},
  age:{type: Number},
  team:{type: String},
  position:{type: String},
})

export default mongoose.model('Profile', Profile)