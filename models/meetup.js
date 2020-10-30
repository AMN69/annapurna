const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
  name: String,
  description: String,
  date: Date,
  time: Number,
  mapPoint: Array,
  idPeople: [{ type: Schema.ObjectId, ref: 'People' }],
  idGroup: { type: Schema.ObjectId, ref: 'Group' }
});

meetupSchema.set('timestamps', true);

const Meetup = mongoose.model('Meetup', groupSchema);

module.exports = Meetup;
