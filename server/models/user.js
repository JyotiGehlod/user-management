import mongoose, { mongo } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String
}, 
  
email: {
    type: String
    }, 
gender: {
    type: String
    }, 
city: {
    type: String
    }, 
profile: {
    type: String
    }, 
 
});

const userModel = mongoose.model('users', userSchema);

export default userModel;