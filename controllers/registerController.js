const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { userName, pwd, email, firstName, lastName } = req.body;
  if (!userName || !pwd) return res.status(400).json({ 'message': 'Username and password are required.'});
  // check for duplicate usernames in the db
  const duplicateUsername = await User.findOne({ username: userName }).exec();
  const duplicateEmail = await User.findOne({ email }).exec();
  if (duplicateUsername) return res.status(409).json({ 'message': "username already in use." }); //conflict
  if (duplicateEmail) return res.status(409).json({ 'message': "Email already in use." }); //conflict

  try {
    //encrypt the password
    // const hashedPwd = await bcrypt.hash(pwd, 10);
    //create and store the new user
    const result = await User.create({ 
      "username": userName,
      "email": email,
      "firstname": firstName,
      "lastname": lastName,
      "password": pwd 
    });
 
    console.log(result, "ln:20 registerController: result");

    // res.status(201).json({ 'success': `New  user ${userName} created!`});
    res.status(201).json({ result: { userName, email, firstName, lastName } });
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  } 
}

module.exports = { handleNewUser };