import mongoose from 'mongoose';

const ConferenceRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    facilities: [{ type: String }],
    photos: [{ url: { type: String }, alt: { type: String } }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

ConferenceRoomSchema.virtual('reservations', {
  ref: 'Reservation',
  localField: '_id',
  foreignField: 'conferenceRoom',
  justOne: false
});

module.exports =
  mongoose.models.ConferenceRoom ||
  mongoose.model('ConferenceRoom', ConferenceRoomSchema);
