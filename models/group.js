const mongoose = require('mongoose');
const Schema = mongoose.Schema;
<<<<<<< HEAD
​
const groupSchema = new Schema({
  adminName: String,
  adminSurname: String,
  idPeople: [{ type: Schema.ObjectId, ref: 'People'}],
=======

const groupSchema = new Schema({
  idAdmin: { type: Schema.ObjectId, ref: 'People' },
  adminName: String,
  adminSurname: String,
  idPeople: [{ type: Schema.ObjectId, ref: 'People' }],
>>>>>>> andreu
  idMeetup: [{ type: Schema.ObjectId, ref: 'Meetup'}],
  groupName: String,
  groupDescription: String
});
<<<<<<< HEAD
​
groupSchema.set('timestamps', true);
​
const Group = mongoose.model('Group', groupSchema);
​
module.exports = Group;
=======

groupSchema.set('timestamps', true);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
>>>>>>> andreu
