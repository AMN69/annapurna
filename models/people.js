const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peopleSchema = new Schema({
  email: String,
  password: String,
  name: String,
  surname: String,
  age: Number,
  hobbies: String,
  isAdmin: {type: Boolean, default: false },
  idGroup: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  idMeetup: [{ type: Schema.Types.ObjectId, ref: 'Meetup'}]
});

peopleSchema.set('timestamps', true);

const People = mongoose.model('People', peopleSchema);

module.exports = People;
