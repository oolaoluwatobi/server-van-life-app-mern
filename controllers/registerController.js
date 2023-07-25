const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { userName, pwd } = req.body;
  if (!userName || !pwd) return res.status(400).json({ 'message': 'Username and password are required.'});
  // check for duplicate usernames in the db
  const duplicateUsername = await User.findOne({ username: userName }).exec();
  if (duplicateUsername) return res.status(409).json({ 'message': "username already in use." }); //conflict

  try {
    //encrypt the password
    // const hashedPwd = await bcrypt.hash(pwd, 10);
    //create and store the new user
    const result = await User.create({ 
      "username": userName,
      "password": pwd 
    });
 
    console.log(result, "ln:20 registerController: result");

    // res.status(201).json({ 'success': `New  user ${userName} created!`});
    res.status(201).json({ result: { userName } });
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  } 
}

module.exports = { handleNewUser };