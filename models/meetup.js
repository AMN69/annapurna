const mongoose = require('mongoose');
const Schema = mongoose.Schema;
<<<<<<< HEAD
​
=======

>>>>>>> andreu
const meetupSchema = new Schema({
  name: String,
  description: String,
  date: Date,
  time: Number,
  mapPoint: Array,
<<<<<<< HEAD
  idPeople: [{ type: Schema.ObjectId, ref: 'People'}],
  idGroup: { type: Schema.ObjectId, ref: 'Group'}
});
​
meetupSchema.set('timestamps', true);
​
const Meetup = mongoose.model('Meetup', groupSchema);
​
module.exports = Meetup;
=======
  idPeople: [{ type: Schema.ObjectId, ref: 'People' }],
  idGroup: { type: Schema.ObjectId, ref: 'Group' }
});

meetupSchema.set('timestamps', true);

const Meetup = mongoose.model('Meetup', groupSchema);

module.exports = Meetup;
>>>>>>> andreu
