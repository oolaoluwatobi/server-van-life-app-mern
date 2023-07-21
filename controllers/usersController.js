const User = require('../model/User');
// const bcrypt = require('bcrypt');

// const getAllUsers = async (req, res) => {
//   const user = await User.find();
//   if (!user) return res.status(204).json({ 'message': 'No users found.'});
//   res.json(user); 
// }

const getAllUsers = async (req, res) => {
  

  //db.users.find({ "quizzes.wk": { $in: ['a'] }})
  
  
  //current page
  const page = req.query.p - 1 || 0;
  const usersPerPage = 20;

  let subscribers = [];
  const users = await User.find({ "quizzes.wk": { $in: ['a'] }})
  .sort({ firstName: 1 })
  .skip(page * usersPerPage)
  .limit(usersPerPage);
  console.log(users, subscribers, "21: usersCont...")
  users.forEach((user) => subscribers.push(user))
  if (!subscribers) return res.status(200).json(subscribers);
  
  if (!users) return res.status(204).json({ 'message': 'No users found.'});
  
  console.log(users, subscribers, "27: usersCont...")

  res.json(users); 
}

const updateUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'ID parameter is required.'});
  }

  const user = await User.findOne({ _id: req.body.id }).exec();  
  if (!user) {
    return res.status(400).json({ "message": `No user matches ID ${req.body.id}.`});
  }
  if (req.body?.userName) user.username = req.body.userName;
  if (req.body?.lastName) user.lastname = req.body.lastName;
  if (req.body?.firstName) user.firstname = req.body.firstName;
  if (req.body?.email) user.email = req.body.email; 
  if (req.body?.pwd) user.password = req.body.pwd;
  // if (req.body?.lastname) user.lastname = req.body.lastname;
  const result = await user.save();
  res.json(result);
}

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'User ID is required.'});
  }

  const user = await User.findOne({ _id: req.body.id }).exec();  
  if (!user) {
    return res.status(204).json({ "message": `No useer matches ID ${req.body.id}.`});
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
}

const getUser = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ 'message': 'User ID is required.'});
  }

  const user = await User.findOne({ _id: req.params.id }).exec();  
  if (!user) {
    return res.status(400).json({ "message": `No user matches ID ${req.params.id}.`});
  }
  res.status(200).json(user);
}

module.exports = {
  getAllUsers,
  // createNewUser,
  updateUser,
  deleteUser,
  getUser
}