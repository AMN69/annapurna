const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const meetupSchema = new Schema({
  name: String,
  description: String,
  date: Date,
  time: String,
  country: String,
  city: String,
  zipcode: Number,
  address: String,
  addressnum: Number,
  mapPoint: Array,
  idPeople: [{ type: Schema.Types.ObjectId, ref: 'People' }],
  idGroup: { type: Schema.Types.ObjectId, ref: 'Group' }
});

meetupSchema.set('timestamps', true);

const Meetup = mongoose.model('Meetup', meetupSchema);

module.exports = Meetup;
