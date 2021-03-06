const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  idAdmin: { type: Schema.Types.ObjectId, ref: 'People' },
  idPeople: [{ type: Schema.Types.ObjectId, ref: 'People' }],
  idMeetup: [{ type: Schema.Types.ObjectId, ref: 'Meetup' }],
  groupName: String,
  groupDescription: String
});

groupSchema.set('timestamps', true);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
