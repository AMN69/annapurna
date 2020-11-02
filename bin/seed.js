const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/annapurnaDb');

const Group = require('../models/group');

const groups = [
  {
    idAdmin: '5f9c4d1b79b5954a3dad2816',
    adminName: 'Andreu',
    adminSurname: 'Martínez',
    idPeople: ["5f9d84c35e419f0e2fc1f3b6"],
    idMeetup: [],
    groupName: "The Group 1 name",
    groupDescription: "The Group 1 descrition"
  },
  {
    idAdmin: '5f9c4d1b79b5954a3dad2816',
    adminName: 'Andreu',
    adminSurname: 'Martínez',
    idPeople: ["5f9d84c35e419f0e2fc1f3b6"],
    idMeetup: [],
    groupName: "The Group 2 name",
    groupDescription: "The Group 2 descrition"
  },
  {
    idAdmin: '5f9c4d1b79b5954a3dad2816',
    adminName: 'Andreu',
    adminSurname: 'Martínez',
    idPeople: ["5f9d84c35e419f0e2fc1f3b6"],
    idMeetup: [],
    groupName: "The Group 3 name",
    groupDescription: "The Group 3 descrition"
  }
];

Group.create(groups, (err, savedGroups) => {
  if (err) { throw err; }
  savedGroups.forEach(theGroup => {
    console.log(`${theGroup.groupName} - ${theGroup._id}`);
  });
});
mongoose.disconnect();
