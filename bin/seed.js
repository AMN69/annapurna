const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/annapurnaDb');

const Group = require('../models/group');

const groups = [
  {
    idAdmin: '5f9c4d1b79b5954a3dad2816',
    adminName: 'Pepe',
    adminSurname: 'Pepito',
    idPeople: ["5f9d84c35e419f0e2fc1f3b6"],
    idMeetup: [],
    groupName: "The Group 1 name",
    groupDescription: "The Group 1 descrition"
  }
];

Group.create(groups, (err, savedGroups) => {
  if (err) { throw err; }
  savedGroups.forEach(theGroup => {
    console.log(`${theGroup.groupName} - ${theGroup._id}`);
  });
});
mongoose.disconnect();
