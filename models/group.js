const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  idAdmin: String,
  adminName: String,
  adminSurname: String,
  idPeople: [{ type: Schema.ObjectId, ref: 'People' }],
  idMeetup: [{ type: Schema.ObjectId, ref: 'Meetup'}],
  groupName: String,
  groupDescription: String
});

groupSchema.set('timestamps', true);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
