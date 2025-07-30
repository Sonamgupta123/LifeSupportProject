import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const donorSchema = mongoose.Schema({
  _id: Number,

  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    lowercase: true,
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    minlength: 5,
    maxlength: 10,
  },

  mobile: {
    type: String,
    required: [true, 'Mobile is required'],
    trim: true,
  },

  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },

  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    
  },

  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['M', 'F', 'Other'],
  },

  donorType: {
    type: String,
    required: [true, 'Donor type is required'],
    enum: ['blood', 'organ'],
  },

  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    // Only required if donorType is 'blood'
  },

  organs: {
    type: [String],
    enum: ['Kidney', 'Liver', 'Heart', 'Lungs'],
    // Only used if donorType is 'organ'
  },

  available: {
    type: Boolean,
    default: true,
  },

  lastDonated: {
    type: Date,
  },

  role: {
    type: String,
    default: 'donor',
  },

  status: {
    type: Number,
    
  },

  info: String,
});

// Apply plugin
donorSchema.plugin(mongooseUniqueValidator);

// Model
const donorSchemaModel = mongoose.model('donor_collection', donorSchema);

export default donorSchemaModel;
