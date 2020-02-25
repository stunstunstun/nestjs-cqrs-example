import * as mongoose from 'mongoose';

const MileageSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true,
    unique: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

MileageSchema.pre('findOneAndUpdate', function hook() {
  this.update({}, { $set: { updated: new Date() } })
})

MileageSchema.index({ userId: 1, created: -1 });

export {
  MileageSchema,
}
