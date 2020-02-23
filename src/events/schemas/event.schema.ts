import * as mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  userId: String,
  placeId: String,
  data: Object,
  created: {
    type: Date,
    default: Date.now,
  },
});

EventSchema.index({ type: 1, action: 1, placeId: 1, created: -1 });
EventSchema.index({ userId: 1, created: -1 });

export {
  EventSchema,
}
