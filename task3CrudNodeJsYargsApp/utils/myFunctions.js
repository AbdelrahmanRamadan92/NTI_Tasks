const fs = require("fs");
const uniqid = require("uniqid");
const chalk = require("chalk");
const validator = require("validator");

const writeDataToFile = function (x) {
  fs.writeFileSync("users.json", JSON.stringify(x));
};
const readDataFromFile = function () {
  let data;
  try {
    data = JSON.parse(fs.readFileSync("users.json"));
    if (!Array.isArray(data)) throw new Error();
  } catch (e) {
    data = [];
  }
  return data;
};
const addNewUser = function (userInputData) {
  try {
    if (!validator.isEmail(userInputData.email))
      throw new Error("invalid Email");
    const allUsers = readDataFromFile();
    const notUniqueEmail = allUsers.find(
      (user) => user.email == userInputData.email
    );
    if (notUniqueEmail) throw new Error("Email used before");
    let user = { id: uniqid(), ...userInputData }; // 3 dots(...) means to get value of object not your name
    allUsers.push(user);
    writeDataToFile(allUsers);
    console.log(chalk.green("user added successfuly"));
  } catch (e) {
    console.log(chalk.red(e.message));
  }
};
const getAllData = function () {
  const allUsers = readDataFromFile();
  if (allUsers.length == 0) return console.log(chalk.red("No users  found"));
  console.log(`your file has ${allUsers.length} records`);
  allUsers.forEach((user) => {
    console.log(
      chalk.green(
        `id: ${user.id} - user name: ${user.name} - user email: ${user.email}`
      )
    );
  });
};
const getSingleUser = function (userId) {
  try {
    const allUsers = readDataFromFile();
    const singleUser = allUsers.find((user) => user.id == userId);
    if (!singleUser) throw new Error("user not found");
    console.log(
      chalk.green(
        `id: ${singleUser.id} - user name: ${singleUser.name} - user email: ${singleUser.email}`
      )
    );
  } catch (e) {
    console.log(chalk.red(e.message));
  }
};

const delUser = function (userId) {
  try {
    const allUsers = readDataFromFile();
    const singleUser = allUsers.find((user) => user.id == userId);
    if (!singleUser) throw new Error("user not found");
    let userIndex = allUsers.indexOf(singleUser);
    // console.log(userIndex)
    allUsers.splice(userIndex, 1);
    writeDataToFile(allUsers);
    console.log(chalk.green("user deleted successfuly"));
  } catch (e) {
    console.log(chalk.red(e.message));
  }
};
const editUser = function (userId, user) {
  try {
    if (!validator.isEmail(user.email))
      throw new Error("invalid Email");
    const allUsers = readDataFromFile();
    singleUser = allUsers.findIndex((user) => user.id == userId);
    if (singleUser==-1) throw new Error("user not found");
    //error here
    const notUniqueEmail = allUsers.find(
      (userSearh) => userSearh.email == user.email
    );
    if(allUsers[singleUser].email !== user.email)
    if (notUniqueEmail) throw new Error("Email used before");
    allUsers[singleUser].name = user.name;
    allUsers[singleUser].email = user.email;
      writeDataToFile(allUsers);
  console.log(chalk.green("user updated successfuly"));

  } catch (e) {
    console.log(chalk.red(e.message));
  }
};

module.exports = { addNewUser, getAllData, getSingleUser, delUser, editUser };
