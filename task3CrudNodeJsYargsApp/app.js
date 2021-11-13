const yargs = require("yargs");
const utills = require("./utils/myFunctions");
//yargs commands
//add user
yargs.command({
  command: "addUser",
  builder: {
    name: { type: "string", demandOption: true },
    email: { type: "string", demandOption: true },
  },
  handler: function (argv) {
    let user = {
      name: argv.name,
      email: argv.email,
    };
    utills.addNewUser(user);
  },
});
//show all users
yargs.command({
  command: "allUsers",
  handler: function () {
    utills.getAllData();
  },
});
//show single user
yargs.command({
  command: "singleUser",
  builder: {
    id: { type: "string", demandOption: true },
  },
  handler: function (argv) {
      let id = argv.id
      utills.getSingleUser(id);
  },
});
//edit user
yargs.command({
  command: "editUser",
  builder: {
    id: { type: "string", demandOption: true },
    name: { type: "string" ,demandOption: true},
    email: { type: "string" ,demandOption: true},
  },
  handler: function (argv) {
    let id = argv.id
    let user = {
      name: argv.name,
      email: argv.email,
    };
      utills.editUser(id,user);
  },
});
// delete user
yargs.command({
  command: "delUser",
  builder: {
    id: { type: "string", demandOption: true },
  },
  handler: function (argv) {
      let id = argv.id
      utills.delUser(id);
  },
});
//end commands
//run yargs module
yargs.argv;
